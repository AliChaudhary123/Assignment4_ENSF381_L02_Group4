import React from "react";
import { useState, useEffect } from "react";

import Header from "./Header";
import CourseCatalog from "./CourseCatalog";
import EnrollmentList from "./EnrollmentList";
import Footer from "./Footer";

export default function CoursePage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const onEnroll = async (course, id) => {
    try {
      const response = await fetch(`http://localhost:5000/enroll/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log("An error occurred. Try again later.");
      console.error(err);
    }
  };

  const onDropCourse = async (course, id) => {
    try {
      const response = await fetch(`http://localhost:5000/drop/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("An error occurred. Try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/student_courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEnrolledCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={onEnroll} />
        <EnrollmentList enrolledCourses={enrolledCourses} />
      </div>
      <Footer />
    </div>
  );
}
