import React, { useState, useEffect } from 'react';
import courses from '../src/data/courses';
import testimonials from '../src/data/testimonials';


function MainSection() {
  const [randomCourses, setRandomCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    const shuffledCourses = courses.sort(() => 0.5 - Math.random()).slice(0, 3);
    setRandomCourses(shuffledCourses);

    const shuffledTestimonials = testimonials.sort(() => 0.5 - Math.random()).slice(0, 2);
    setRandomTestimonials(shuffledTestimonials);
  }, []);

  return (
    <main>
      <section className="about-lms">
        <h2>About LMS</h2>
        <p>Our Learning Management System (LMS) helps you access a variety of courses to enhance your skills.</p>
      </section>

      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="course-list">
          {randomCourses.map((course) => (
            <div key={course.id} className="course-info">
              <img src={course.image} alt={course.name} />
              <h3>{course.name}</h3>
              <p>{course.instructor}</p>
              <p>{course.description}</p>
              <p>{course.duration}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>Testimonials</h2>
        {randomTestimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <p><strong>{testimonial.studentName}</strong> took the <em>{testimonial.courseName}</em> course.</p>
            <p>{testimonial.review}</p>
            <p>{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default MainSection;