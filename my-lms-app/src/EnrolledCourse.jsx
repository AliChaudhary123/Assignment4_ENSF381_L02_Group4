import { useState } from "react";

export default function EnrolledCourse({
  courseName,
  creditHours,
  onDropCourse,
}) {
  const [enrollmentCount, setEnrollmentCount] = useState(1);
  return (
    enrollmentCount > 0 && (
      <div>
        <h1>{courseName}</h1>
        <h3>Credit Hours: {creditHours}</h3>
        <h4>Enrolled: {enrollmentCount}</h4>
        <br />
        <button onClick={() => onDropCourse(courseName)}>Drop Course</button>
      </div>
    )
  );
}
