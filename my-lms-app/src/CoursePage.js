import React, { useState, useEffect } from "react";
import Header from "./Header";
import CourseCatalog from "./CourseCatalog";
import EnrollmentList from "./EnrollmentList";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function CoursePage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  if (!studentId) {
    alert("Please log in first.");
    navigate("/courses");
   
  }

  // Enroll in a course
  const onEnroll = async (course) => {
    try {
      const response = await fetch(`http://localhost:5000/enroll/${studentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setEnrolledCourses((prevCourses) => [...prevCourses, course]); 
      } else {
        console.log(data.error);
        alert(data.error); 
      }
    } catch (err) {
      console.log("An error occurred. Try again later.");
      console.error(err);
    }
  };

  // Drop a course
  const onDropCourse = async (course) => {
    try {
      const response = await fetch(`http://localhost:5000/drop/${studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setEnrolledCourses((prevCourses) =>
          prevCourses.filter((enrolledCourse) => enrolledCourse.id !== course.id)
        );
      } else {
        alert(data.error); 
      }
    } catch (err) {
      alert("An error occurred. Try again later.");
      console.error(err);
    }
  };


  useEffect(() => {
    fetch(`http://127.0.0.1:5000/student_courses/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        setEnrolledCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [studentId]);

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={onEnroll} />
        <EnrollmentList
          enrolledCourses={enrolledCourses}
          onDropCourse={onDropCourse}
        />
      </div>
      <Footer />
    </div>
  );
}