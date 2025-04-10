import CourseItem from "./CourseItem";
import { useEffect, useState } from "react";

export default function CourseCatalog({ onEnroll }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);
  return (
    <div>
      {courses.map((course) => (
        <CourseItem
          key={course.id}
          image={`http://localhost:5000${course.image}`}
          name={course.name}
          instructor={course.instructor}
          description={course.description}
          onEnroll={onEnroll}
        />
      ))}
    </div>
  );
}
