import CourseItem from "./CourseItem";
import courses from "./data/courses";

export default function CourseCatalog({ onEnroll }) {
  return (
    <div>
      {courses.map((course) => (
        <CourseItem
          key={course.id}
          image={course.image}
          name={course.name}
          instructor={course.instructor}
          description={course.description}
          onEnroll={onEnroll}
        />
      ))}
    </div>
  );
}
