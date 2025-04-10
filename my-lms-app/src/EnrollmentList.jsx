import EnrolledCourse from "./EnrolledCourse";

export default function EnrollmentList({ enrolledCourses }) {
  let totalHours = 0;

  return (
    <div>
      <h1>Enrolled Courses</h1>
      {enrolledCourses.map((course) => (
        <EnrolledCourse
          courseName={course.courseName}
          creditHours={course.creditHours}
        />
      ))}
      <h1>Total Hours: {totalHours}</h1>
    </div>
  );
}
