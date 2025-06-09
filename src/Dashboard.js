import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStat, setActiveStat] = useState("courses");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["DASHBOARD", "CONTENT", "USERS", "REPORTS", "ADMIN"];

  const courses = [
    {
      img: "imageMask-1.svg",
      title: "Acceleration",
      desc: "Physics | Grade 7 +2",
      units: 4,
      lessons: 18,
      topics: 24,
      class: "Mr. Frank's Class B",
      date: "21-Jan-2020 to 21-Aug-2020",
      students: "50",
    },
    {
      img: "imageMask-2.svg",
      title: "Displacement, Velocity and Speed",
      desc: "Physics | Grade 6 +3",
      units: 2,
      lessons: 15,
      topics: 20,
      class: "No Classes",
    },
    {
      img: "imageMask.svg",
      title: "Introduction to Biology: Micro organisms and how they affect",
      desc: "Biology | Grade 4 +1",
      units: 5,
      lessons: 16,
      topics: 22,
      class: "All Classes",
      students: "300",
    },
    {
      img: "imageMask-3.svg",
      title: "Introduction to High School Mathematics",
      desc: "Mathematics | Grade 8 +3",
      units: "--",
      lessons: "",
      topics: "",
      class: "Mr. Frank's Class A",
      date: "14-Oct-2019 to 20-Oct-2020",
      students: "44",
    },
  ];

  return (
    <div className="page-container">
      <header className={`top-bar ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="logo-section">
          <img
            src="assets/icons/logo used in header.svg"
            alt="Quantum Logo"
            className="logo"
          />
        </div>

        <div className="header-right">
          <nav className="top-nav">
            {/* Desktop nav links */}
            <div className="nav-links-desktop">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  className={activeIndex === index ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </a>
              ))}
            </div>

          </nav>

          <div className="top-icons">
            <div className="icon-with-badge">
              <img src="assets/icons/alerts.svg" alt="Notifications" />
              <span className="badge">1</span>
            </div>
            <div className="icon-with-badge">
              <img src="assets/icons/announcements.svg" alt="Announcements" />
              <span className="badge">2</span>
            </div>
            <img src="assets/icons/account_circle.svg" alt="Profile" />
             <div
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img src="assets/icons/hamburger-menu.svg" alt="Menu" />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            {navItems.map((item, index) => (
              <a
                key={item}
                className={activeIndex === index ? "active" : ""}
                onClick={() => {
                  setActiveIndex(index);
                  setIsMenuOpen(false);
                }}
                style={{ cursor: "pointer" }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="content-wrap">
        <section className="stats-bar">
          <div
            className={`stats-box ${activeStat === "courses" ? "active" : ""}`}
            onClick={() => setActiveStat("courses")}
            style={{ cursor: "pointer" }}
          >
            <img src="/assets/icons/courses.svg" alt="Courses" />
            <span>
              <strong style={{ fontSize: "1.5rem" }}>4</strong> Courses
            </span>
          </div>
          <div
            className={`stats-box ${activeStat === "classes" ? "active" : ""}`}
            onClick={() => setActiveStat("classes")}
            style={{ cursor: "pointer" }}
          >
            <img src="/assets/icons/classes.svg" alt="Classes" />
            <span>
              <strong style={{ fontSize: "1.5rem" }}>4</strong> Classes
            </span>
          </div>
        </section>

        <section className="filter-bar">
          <span>Showing 4 of 4 courses</span>
          <div className="sort">
            <span>Sort By:</span>
            <select>
              <option>Course Name</option>
            </select>
            <img src="/assets/icons/sort.svg" alt="Sort Icon" />
          </div>
        </section>

        <main className="course-grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <img
                src="/assets/icons/favourite.svg"
                className="fav-icon"
                alt="Favorite"
              />
              <div className="thumb-info-wrapper">
                <img
                  src={`/assets/images/${course.img}`}
                  className="course-thumb"
                  alt="Course"
                />
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>
                    {(() => {
                      const match = course.desc.match(/(.+?)(\s\+\d+)/);
                      if (match) {
                        return (
                          <>
                            {match[1]}
                            <span className="highlight-plus">{match[2]}</span>
                          </>
                        );
                      } else {
                        return course.desc;
                      }
                    })()}
                  </p>

                  <p>
                    {course.units !== "--" ? (
                      <>
                        <strong>{course.units} </strong>Units{" "}
                        <strong>{course.lessons}</strong> Lessons{" "}
                        <strong>{course.topics}</strong> Topics
                      </>
                    ) : (
                      <strong> </strong>
                    )}
                  </p>

                  <div className="custom-select-wrapper">
                    <select>
                      <option>{course.class}</option>
                    </select>
                  </div>

                  {course.students && (
                    <p>
                      {course.students} Students{" "}
                      {course.date && `| ${course.date}`}
                    </p>
                  )}
                </div>
              </div>
              <div className="icons">
                <img src="/assets/icons/preview.svg" alt="Preview" />
                <img
                  src="/assets/icons/manage course.svg"
                  alt="Manage Course"
                  style={{ opacity: index === 1 || index === 2 ? 0.4 : 1 }}
                />
                <img
                  src="/assets/icons/grade submissions.svg"
                  alt="Grade Submissions"
                  style={{ opacity: index === 1 || index === 2 ? 0.4 : 1 }}
                />
                <img src="/assets/icons/reports.svg" alt="Reports" />
              </div>
            </div>
          ))}
        </main>
      </div>

      <div className="page-footer-links">
        <a href="#">About</a>
        <span
          style={{ color: "#838585", fontWeight: "normal", fontSize: "1.25rem" }}
        >
          |
        </span>
        <a href="#">Contact Us</a>
      </div>

      <footer className="page-footer">
        <div className="page-footer-content">
          <img
            src="/assets/icons/logo used in footer.svg"
            alt="Quantum Logo"
            className="page-footer-logo"
          />
          <span className="page-footer-separator">|</span>
          <p className="page-footer-text">Copyright © 2020–2021</p>
          <p className="page-footer-text company-name">
            <strong>Zeus Systems Pvt. Ltd.</strong>
          </p>
          <p className="page-footer-text">All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
