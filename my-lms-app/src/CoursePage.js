import React from "react";
import { useState, useEffect } from "react";

import Header from "./Header";
import CourseCatalog from "./CourseCatalog";
import EnrollmentList from "./EnrollmentList";
import Footer from "./Footer";

export default function CoursePage() {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const savedCourses = localStorage.getItem("enrolledCourses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const onEnroll = (course) => {
    setEnrolledCourses((prevCourses) => {
      const existingCourse = prevCourses.find(
        (enrolledCourse) => enrolledCourse.courseName === course
      );

      if (!existingCourse) {
        return [...prevCourses, { courseName: course, creditHours: 3 }];
      }

      return prevCourses;
    });
  };

  const onDropCourse = (courseName) => {
    setEnrolledCourses((prevCourses) => {
      const updatedCourses = prevCourses.filter(
        (course) => course.courseName !== courseName
      );
      return updatedCourses;
    });
  };

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={onEnroll} />
        <EnrollmentList
          enrolledCourses={enrolledCourses}
          setEnrolledCourses={setEnrolledCourses}
          onDropCourse={onDropCourse}
        />
      </div>
      <Footer />
    </div>
  );
}
