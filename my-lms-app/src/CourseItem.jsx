/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";

export default function CourseItem({
  image,
  name,
  instructor,
  description,
  onEnroll,
}) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div>
      {" "}
      <img
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
        src={image}
        alt="Course Image"
      />
      <p>{name}</p>
      <p>{instructor}</p>
      <button onClick={() => onEnroll(name)}>Enroll Now</button>
      {showDescription && <div>{description}</div>}
    </div>
  );
}
