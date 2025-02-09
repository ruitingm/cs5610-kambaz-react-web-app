import { Link } from "react-router-dom";
import * as db from "./Database";
export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashbaord-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-course" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to="/Kambaz/Courses/${course._id}/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img src={course.img} width="100%" height={160}></img>
                  <div className="card-body">
                    <h5 className="wd-dashbaord-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-hidden"
                      style={{ maxHeight: "100px" }}
                    >
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
