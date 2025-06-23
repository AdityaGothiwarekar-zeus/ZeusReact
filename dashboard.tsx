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
import React, { useRef, useEffect, useState } from 'react';
import './Grid.css';
import Header from '../Navbar/Header';

const ROWS_PER_PAGE = 200;
const TOTAL_ROWS = 50000;
const TOTAL_COLS = 100;
const COL_WIDTH = 80;
const ROW_HEIGHT = 24;
const ROW_HEADER_WIDTH = 40;
const COL_HEADER_HEIGHT = 24;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

function getColLetter(n) {
  let s = '';
  while (n >= 0) {
    s = String.fromCharCode((n % 26) + 65) + s;
    n = Math.floor(n / 26) - 1;
  }
  return s;
}

export default function GridPage() {
  const canvasRef = useRef(null);
  const [cellData, setCellData] = useState({});
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [currentPage, setCurrentPage] = useState(0); // page index
  const [fontFamily, setFontFamily] = useState('Arial');

  const startRow = currentPage * ROWS_PER_PAGE;
  const endRow = Math.min(startRow + ROWS_PER_PAGE, TOTAL_ROWS);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.font = `14px ${fontFamily}`;
    ctx.textBaseline = 'middle';

    // Column headers
    for (let c = 0; c < TOTAL_COLS; c++) {
      const x = ROW_HEADER_WIDTH + c * COL_WIDTH;
      ctx.fillStyle = c === selected.c ? '#90ee90' : '#f0f0f0';
      ctx.fillRect(x, 0, COL_WIDTH, COL_HEADER_HEIGHT);
      ctx.strokeRect(x, 0, COL_WIDTH, COL_HEADER_HEIGHT);
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(getColLetter(c), x + COL_WIDTH / 2, COL_HEADER_HEIGHT / 2);
    }

    // Row headers + cells
    for (let r = 0; r < ROWS_PER_PAGE; r++) {
      const realRow = startRow + r;
      const y = COL_HEADER_HEIGHT + r * ROW_HEIGHT;

      // Row header
      ctx.fillStyle = realRow === selected.r ? '#90ee90' : '#f0f0f0';
      ctx.fillRect(0, y, ROW_HEADER_WIDTH, ROW_HEIGHT);
      ctx.strokeRect(0, y, ROW_HEADER_WIDTH, ROW_HEIGHT);
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(realRow + 1, ROW_HEADER_WIDTH / 2, y + ROW_HEIGHT / 2);

      // Cells
      for (let c = 0; c < TOTAL_COLS; c++) {
        const x = ROW_HEADER_WIDTH + c * COL_WIDTH;
        const key = `${realRow},${c}`;
        const isSelected = realRow === selected.r && c === selected.c;

        ctx.fillStyle = isSelected ? '#cde8ff' : 'white';
        ctx.fillRect(x, y, COL_WIDTH, ROW_HEIGHT);
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(x, y, COL_WIDTH, ROW_HEIGHT);

        const val = cellData[key];
        if (val) {
          ctx.fillStyle = 'black';
          ctx.textAlign = 'left';
          ctx.fillText(val, x + 4, y + ROW_HEIGHT / 2);
        }
      }
    }
  };

  useEffect(() => {
    drawGrid();
  }, [cellData, selected, currentPage, fontFamily]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < ROW_HEADER_WIDTH || y < COL_HEADER_HEIGHT) return;

    const c = Math.floor((x - ROW_HEADER_WIDTH) / COL_WIDTH);
    const r = Math.floor((y - COL_HEADER_HEIGHT) / ROW_HEIGHT);
    const realRow = startRow + r;
    setSelected({ r: realRow, c });
  };

  const handleEdit = (e) => {
    const val = e.target.value;
    const key = `${selected.r},${selected.c}`;
    setCellData((prev) => ({ ...prev, [key]: val }));
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0 && (startRow + ROWS_PER_PAGE < TOTAL_ROWS)) {
      setCurrentPage((p) => p + 1);
    } else if (e.deltaY < 0 && currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <div>
      <Header onFontChange={setFontFamily} />
      <div className="formula-bar">
        <div className="cell-label">
          {getColLetter(selected.c)}
          {selected.r + 1}
        </div>
        <input
          className="formula-input"
          type="text"
          value={cellData[`${selected.r},${selected.c}`] || ''}
          onChange={handleEdit}
        />
      </div>
      <div
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          overflow: 'hidden',
          border: '1px solid #ccc',
        }}
        onWheel={handleWheel}
      >
        <canvas ref={canvasRef} onClick={handleClick} />
      </div>
    </div>
  );
}
.formula-bar {
  display: flex;
  padding: 8px;
  background: #eee;
  border-bottom: 1px solid #ccc;
}
.cell-label {
  margin-right: 10px;
  font-weight: bold;
}
.formula-input {
  flex: 1;
  padding: 4px;
}
