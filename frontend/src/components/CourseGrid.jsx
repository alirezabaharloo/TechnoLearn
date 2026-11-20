import CourseCard from "./CourseCard.jsx";

export default function CourseGrid({ courses = [], loading = false }) {
  return <div className="course-grid" aria-busy={loading}>
    {loading ? Array.from({ length: 3 }, (_, i) => <div className="course-card skeleton" key={i}><div /><span /><span /><span /></div>) : courses.map((course) => <CourseCard key={course.id} course={course} />)}
  </div>;
}
