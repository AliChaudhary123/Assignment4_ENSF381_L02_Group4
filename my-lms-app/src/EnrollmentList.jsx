import EnrolledCourse from "./EnrolledCourse";

export default function EnrollmentList({
  enrolledCourses,
  setEnrolledCourses,
  onDropCourse,
}) {
  let totalHours = 0;

  console.log(enrolledCourses);

  for (let key in enrolledCourses) {
    totalHours += 3;
  }

  return (
    <div>
      <h1>Enrolled Courses</h1>
      {enrolledCourses.map((course) => (
        <EnrolledCourse
          courseName={course.courseName}
          creditHours={course.creditHours}
          onDropCourse={onDropCourse}
        />
      ))}
      <h1>Total Hours: {totalHours}</h1>
    </div>
  );
}
