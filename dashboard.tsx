import React, { useState } from "react";
import Header from "./Components/Header/Header";
import StatsBar from "./Components/StatsBar/StatsBar";
import FilterBar from "./Components/StatsBar/FilterBar";
import CourseGrid from "./Components/Course/ CourseGrid";
import './dashboard.css';

type Alert = {
  id: number;
  title: string;
  timestamp: string;
  icon: "tick" | "circle";
  label?: string;
  desc?: string;
};

type Announcement = {
  id: number;
  sender: string;
  title: string;
  timestamp: string;
  icon: "tick" | "circle";
  desc?: string;
  highlight?: boolean;
};

const Dashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStat, setActiveStat] = useState<"courses" | "classes">("courses");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  const toggleAlerts = () => {
    setIsAlertOpen(!isAlertOpen);
    setIsAnnouncementOpen(false);
    setIsMenuOpen(false);
  };

  const toggleAnnouncements = () => {
    setIsAnnouncementOpen(!isAnnouncementOpen);
    setIsAlertOpen(false);
    setIsMenuOpen(false);
  };

  const courses = [
    {
      img: "imageMask-1.svg",
      title: "Acceleration",
      desc: "Physics",
      grades: [7, 2],
      units: 4,
      lessons: 18,
      topics: 24,
      class: "Mr. Frank's Class B",
      date: "21-Jan-2020 to 21-Aug-2020",
      students: "50",
      expired: false,
    },
    {
      img: "imageMask-2.svg",
      title: "Displacement, Velocity and Speed",
      desc: "Physics",
      grades: [6, 3],
      units: 2,
      lessons: 15,
      topics: 20,
      class: "No Classes",
      expired: false,
    },
    {
      img: "imageMask.svg",
      title: "Introduction to Biology: Micro organisms and how they affect",
      desc: "Biology",
      grades: [4, 1],
      units: 5,
      lessons: 16,
      topics: 22,
      class: "All Classes",
      students: "300",
      expired: false,
    },
    {
      img: "imageMask-3.svg",
      title: "Introduction to High School Mathematics",
      desc: "Mathematics",
      grades: [8, 3],
      units: "--",
      lessons: "",
      topics: "",
      class: "Mr. Frank's Class A",
      date: "14-Oct-2019 to 20-Oct-2020",
      students: "44",
      expired: true,
    },
  ];
const alerts: Alert[] = [
  {
    id: 1,
    title: "New Course Published",
    label: "Course",
    desc: "React for Beginners",
    timestamp: "2h ago",
    icon: "tick",
  },
  {
    id: 2,
    title: "Server Downtime",
    timestamp: "5h ago",
    icon: "circle",
  },
  {
    id: 3,
    title: "Update Available",
    label: "System",
    desc: "v2.1 Released",
    timestamp: "1d ago",
    icon: "tick",
  },
];

const announcements: Announcement[] = [
  {
    id: 1,
    sender: "Admin",
    title: "Quarterly Review Meeting",
    desc: "agenda.pdf",
    timestamp: "1h ago",
    icon: "tick",
    highlight: true,
  },
  {
    id: 2,
    sender: "HR",
    title: "Policy Update",
    timestamp: "6h ago",
    icon: "circle",
  },
  {
    id: 3,
    sender: "CEO",
    title: "Company Vision 2025",
    desc: "slides.pptx",
    timestamp: "2d ago",
    icon: "tick",
    highlight: true,
  },
];



  return (
    <div className="page-container">
     <Header
  activeIndex={activeIndex}
  setActiveIndex={setActiveIndex}
  isMenuOpen={isMenuOpen}
  setIsMenuOpen={setIsMenuOpen}
  isAlertOpen={isAlertOpen}
  toggleAlerts={toggleAlerts}
  isAnnouncementOpen={isAnnouncementOpen}
  toggleAnnouncements={toggleAnnouncements}
  alerts={alerts}
  announcements={announcements}
/>

      <div className="content-wrap">
        <StatsBar activeStat={activeStat} setActiveStat={setActiveStat} />
        <FilterBar totalCourses={courses.length} />
        <CourseGrid courses={courses} />
      </div>
      <footer className="page-footer">
        <div className="page-footer-content">
          <img src="/assets/icons/logo used in footer.svg" alt="Quantum Logo" className="page-footer-logo" />
          <span className="page-footer-separator">|</span>
          <p className="page-footer-text">Copyright © 2020–2021</p>
          <p className="page-footer-text company-name"><strong>Zeus Systems Pvt. Ltd.</strong></p>
          <p className="page-footer-text">All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
