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

/////////////////////////////////////////////// New Code //////////////////////////////////////////////////////////////////
import React, { useRef, useEffect, useState, useCallback } from 'react';

const TOTAL_ROWS = 100000;
const TOTAL_COLS = 26; // A-Z columns
const COL_WIDTH = 80;
const ROW_HEIGHT = 24;
const ROW_HEADER_WIDTH = 40;
const COL_HEADER_HEIGHT = 24;
const CANVAS_WIDTH = 1695;
const CANVAS_HEIGHT = 790;

function getColLetter(n) {
  let s = '';
  while (n >= 0) {
    s = String.fromCharCode((n % 26) + 65) + s;
    n = Math.floor(n / 26) - 1;
  }
  return s;
}

// Calculate statistics for selected range
function calculateStats(cellData, selection) {
  if (!selection.isRange) return null;
  
  const { startRow, endRow, startCol, endCol } = selection;
  const values = [];
  
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const key = `${r},${c}`;
      const val = cellData[key];
      if (val && !isNaN(parseFloat(val))) {
        values.push(parseFloat(val));
      }
    }
  }
  
  if (values.length === 0) return null;
  
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const count = values.length;
  
  return { count, sum, avg, min, max };
}

// Header Component
function Header({ onLoadData, onFontChange, onUndo, onRedo, canUndo, canRedo, onSave, onCopy, onPaste, onCut }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          onLoadData(data);
        } catch (error) {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ 
      background: '#f8f9fa', 
      border: '1px solid #dee2e6', 
      padding: '8px 16px', 
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <h2 style={{ margin: 0, fontSize: '18px' }}>Advanced Spreadsheet</h2>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => fileInputRef.current?.click()}>
          📁 Load JSON
        </button>
        <button onClick={onSave}>
          💾 Save
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
          ↶ Undo
        </button>
        <button onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Y)">
          ↷ Redo
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onCopy} title="Copy (Ctrl+C)">
          📋 Copy
        </button>
        <button onClick={onCut} title="Cut (Ctrl+X)">
          ✂️ Cut
        </button>
        <button onClick={onPaste} title="Paste (Ctrl+V)">
          📄 Paste
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <select onChange={(e) => onFontChange(e.target.value)} defaultValue="Arial">
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Helvetica">Helvetica</option>
      </select>
    </div>
  );
}

// Statistics Panel Component
function StatsPanel({ stats, selection }) {
  if (!stats) return null;
  
  return (
    <div style={{
      background: '#e3f2fd',
      border: '1px solid #90caf9',
      borderRadius: '4px',
      padding: '8px',
      fontSize: '12px',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
      <span><strong>Count:</strong> {stats.count}</span>
      <span><strong>Sum:</strong> {stats.sum.toFixed(2)}</span>
      <span><strong>Avg:</strong> {stats.avg.toFixed(2)}</span>
      <span><strong>Min:</strong> {stats.min}</span>
      <span><strong>Max:</strong> {stats.max}</span>
      <span style={{ color: '#666' }}>
        Range: {getColLetter(selection.startCol)}{selection.startRow + 1}:{getColLetter(selection.endCol)}{selection.endRow + 1}
      </span>
    </div>
  );
}

export default function GridPage() {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
   const [cellData, setCellData] = useState(new Map());
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [selection, setSelection] = useState({ 
    startRow: 0, 
    startCol: 0, 
    endRow: 0, 
    endCol: 0, 
    isRange: false 
  });
  const [scrollTop, setScrollTop] = useState(0);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isSelecting, setIsSelecting] = useState(false);
  const [history, setHistory] = useState([{}]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [clipboard, setClipboard] = useState(null);

  // Calculate statistics for current selection
  const stats = calculateStats(cellData, selection);

  // Calculate which rows should be visible based on scroll position
  const getVisibleRowRange = useCallback(() => {
    const startRow = Math.floor(scrollTop / ROW_HEIGHT);
    const visibleRowsInCanvas = Math.floor((CANVAS_HEIGHT - COL_HEADER_HEIGHT) / ROW_HEIGHT) + 2;
    const endRow = Math.min(startRow + visibleRowsInCanvas, TOTAL_ROWS);
    return { startRow, endRow };
  }, [scrollTop]);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.font = `14px ${fontFamily}`;
    ctx.textBaseline = 'middle';

    const { startRow, endRow } = getVisibleRowRange();

    // Draw column headers
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CANVAS_WIDTH, COL_HEADER_HEIGHT);
    
    for (let c = 0; c < TOTAL_COLS; c++) {
      const x = ROW_HEADER_WIDTH + c * COL_WIDTH;
      if (x >= CANVAS_WIDTH) break;
      
      // Highlight selected columns
      const isColSelected = selection.isRange && c >= selection.startCol && c <= selection.endCol;
      ctx.fillStyle = isColSelected ? '#bbdefb' : (c === selected.c ? '#107c41' : '#f0f0f0');
      ctx.fillRect(x, 0, COL_WIDTH, COL_HEADER_HEIGHT);
      ctx.strokeStyle = '#d8d9db';
      ctx.strokeRect(x, 0, COL_WIDTH, COL_HEADER_HEIGHT);
      ctx.fillStyle = (c === selected.c || isColSelected) ? '#ffffff' : 'black';
      ctx.textAlign = 'center';
      ctx.fillText(getColLetter(c), x + COL_WIDTH / 2, COL_HEADER_HEIGHT / 2);
    }

    // Draw row header background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, COL_HEADER_HEIGHT, ROW_HEADER_WIDTH, CANVAS_HEIGHT - COL_HEADER_HEIGHT);

    // Draw visible rows
    for (let r = startRow; r < endRow; r++) {
      const canvasY = COL_HEADER_HEIGHT + ((r - startRow) * ROW_HEIGHT);
      
      if (canvasY >= CANVAS_HEIGHT) break;
      
      // Highlight selected rows
      const isRowSelected = selection.isRange && r >= selection.startRow && r <= selection.endRow;
      
      // Draw row header
      ctx.fillStyle = isRowSelected ? '#bbdefb' : (r === selected.r ? '#107c41' : '#f0f0f0');
      ctx.fillRect(0, canvasY, ROW_HEADER_WIDTH, ROW_HEIGHT);
      ctx.strokeStyle = '#d8d9db';
      ctx.strokeRect(0, canvasY, ROW_HEADER_WIDTH, ROW_HEIGHT);
      ctx.fillStyle = (r === selected.r || isRowSelected) ? '#ffffff' : 'black';
      ctx.textAlign = 'center';
      ctx.fillText(r + 1, ROW_HEADER_WIDTH / 2, canvasY + ROW_HEIGHT / 2);

      // Draw cells for this row
      for (let c = 0; c < TOTAL_COLS; c++) {
        const x = ROW_HEADER_WIDTH + c * COL_WIDTH;
        if (x >= CANVAS_WIDTH) break;
        
        const key = `${r},${c}`;
        const isCurrentCell = r === selected.r && c === selected.c;
        const isInSelection = selection.isRange && 
          r >= selection.startRow && r <= selection.endRow &&
          c >= selection.startCol && c <= selection.endCol;

        // Cell background
        let bgColor = 'white';
        if (isCurrentCell) bgColor = '#f1faf1';
        else if (isInSelection) bgColor = '#e3f2fd';

        ctx.fillStyle = bgColor;
        ctx.fillRect(x, canvasY, COL_WIDTH, ROW_HEIGHT);
        
        // Cell border
        ctx.strokeStyle = '#d8d9db';
        ctx.strokeRect(x, canvasY, COL_WIDTH, ROW_HEIGHT);

        // Cell content
        const val = cellData[key];
        if (val) {
          ctx.fillStyle = 'black';
          ctx.textAlign = 'left';
          const text = String(val).substring(0, 10);
          ctx.fillText(text, x + 4, canvasY + ROW_HEIGHT / 2);
        }
      }
    }

    // Draw selection border
    if (selection.isRange) {
      const selStartRow = Math.max(selection.startRow, startRow);
      const selEndRow = Math.min(selection.endRow, endRow - 1);
      
      if (selStartRow <= selEndRow) {
        const selStartY = COL_HEADER_HEIGHT + ((selStartRow - startRow) * ROW_HEIGHT);
        const selEndY = COL_HEADER_HEIGHT + ((selEndRow - startRow + 1) * ROW_HEIGHT);
        const selStartX = ROW_HEADER_WIDTH + selection.startCol * COL_WIDTH;
        const selWidth = (selection.endCol - selection.startCol + 1) * COL_WIDTH;
        
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 2;
        ctx.strokeRect(selStartX, selStartY, selWidth, selEndY - selStartY);
        ctx.lineWidth = 1;
      }
    } else {
      // Single cell selection
      if (selected.r >= startRow && selected.r < endRow) {
        const selY = COL_HEADER_HEIGHT + ((selected.r - startRow) * ROW_HEIGHT);
        const selX = ROW_HEADER_WIDTH + selected.c * COL_WIDTH;
        
        ctx.strokeStyle = '#107c41';
        ctx.lineWidth = 2;
        ctx.strokeRect(selX, selY, COL_WIDTH, ROW_HEIGHT);
        ctx.lineWidth = 1;
      }
    }
  }, [cellData, selected, selection, scrollTop, fontFamily, getVisibleRowRange]);

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  const addToHistory = useCallback((newData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...newData });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < ROW_HEADER_WIDTH || y < COL_HEADER_HEIGHT) return;

    const c = Math.floor((x - ROW_HEADER_WIDTH) / COL_WIDTH);
    const canvasRowIndex = Math.floor((y - COL_HEADER_HEIGHT) / ROW_HEIGHT);
    const { startRow } = getVisibleRowRange();
    const r = startRow + canvasRowIndex;

    if (c >= 0 && c < TOTAL_COLS && r >= 0 && r < TOTAL_ROWS) {
      setSelected({ r, c });
      setSelection({ 
        startRow: r, 
        startCol: c, 
        endRow: r, 
        endCol: c, 
        isRange: false 
      });
      setIsSelecting(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isSelecting) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < ROW_HEADER_WIDTH || y < COL_HEADER_HEIGHT) return;

    const c = Math.floor((x - ROW_HEADER_WIDTH) / COL_WIDTH);
    const canvasRowIndex = Math.floor((y - COL_HEADER_HEIGHT) / ROW_HEIGHT);
    const { startRow } = getVisibleRowRange();
    const r = startRow + canvasRowIndex;

    if (c >= 0 && c < TOTAL_COLS && r >= 0 && r < TOTAL_ROWS) {
      const newSelection = {
        startRow: Math.min(selected.r, r),
        endRow: Math.max(selected.r, r),
        startCol: Math.min(selected.c, c),
        endCol: Math.max(selected.c, c),
        isRange: selected.r !== r || selected.c !== c
      };
      setSelection(newSelection);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const handleEdit = (e) => {
    const val = e.target.value;
    const key = `${selected.r},${selected.c}`;
    const newData = { ...cellData, [key]: val };
    setCellData(newData);
    addToHistory(newData);
  };

  const handleKeyDown = (e) => {
    // Handle Ctrl combinations
    if (e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          e.preventDefault();
          handleUndo();
          return;
        case 'y':
          e.preventDefault();
          handleRedo();
          return;
        case 'c':
          e.preventDefault();
          handleCopy();
          return;
        case 'x':
          e.preventDefault();
          handleCut();
          return;
        case 'v':
          e.preventDefault();
          handlePaste();
          return;
        case 'a':
          e.preventDefault();
          handleSelectAll();
          return;
      }
    }

    let newSelected = { ...selected };
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newSelected.r = Math.max(0, selected.r - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newSelected.r = Math.min(TOTAL_ROWS - 1, selected.r + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newSelected.c = Math.max(0, selected.c - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newSelected.c = Math.min(TOTAL_COLS - 1, selected.c + 1);
        break;
      case 'Delete':
      case 'Backspace':
        e.preventDefault();
        handleDelete();
        return;
      default:
        return;
    }
    
    setSelected(newSelected);
    setSelection({
      startRow: newSelected.r,
      startCol: newSelected.c,
      endRow: newSelected.r,
      endCol: newSelected.c,
      isRange: false
    });
    
    // Auto-scroll logic
    if (scrollContainerRef.current) {
      const rowPosition = newSelected.r * ROW_HEIGHT;
      const containerHeight = CANVAS_HEIGHT - COL_HEADER_HEIGHT;
      const visibleStart = scrollTop;
      const visibleEnd = scrollTop + containerHeight;
      
      if (rowPosition < visibleStart) {
        scrollContainerRef.current.scrollTop = rowPosition;
      } else if (rowPosition + ROW_HEIGHT > visibleEnd) {
        scrollContainerRef.current.scrollTop = rowPosition - containerHeight + ROW_HEIGHT;
      }
    }
  };

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCellData(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCellData(history[historyIndex + 1]);
    }
  };

  const handleCopy = () => {
    const data = [];
    for (let r = selection.startRow; r <= selection.endRow; r++) {
      const row = [];
      for (let c = selection.startCol; c <= selection.endCol; c++) {
        const key = `${r},${c}`;
        row.push(cellData[key] || '');
      }
      data.push(row);
    }
    setClipboard({ data, cut: false });
  };

  const handleCut = () => {
    handleCopy();
    setClipboard(prev => ({ ...prev, cut: true }));
    handleDelete();
  };

  const handlePaste = () => {
    if (!clipboard) return;
    
    const newData = { ...cellData };
    const { data } = clipboard;
    
    for (let r = 0; r < data.length; r++) {
      for (let c = 0; c < data[r].length; c++) {
        const targetRow = selected.r + r;
        const targetCol = selected.c + c;
        if (targetRow < TOTAL_ROWS && targetCol < TOTAL_COLS) {
          const key = `${targetRow},${targetCol}`;
          newData[key] = data[r][c];
        }
      }
    }
    
    setCellData(newData);
    addToHistory(newData);
  };

  const handleDelete = () => {
    const newData = { ...cellData };
    for (let r = selection.startRow; r <= selection.endRow; r++) {
      for (let c = selection.startCol; c <= selection.endCol; c++) {
        const key = `${r},${c}`;
        delete newData[key];
      }
    }
    setCellData(newData);
    addToHistory(newData);
  };

  const handleSelectAll = () => {
    setSelection({
      startRow: 0,
      startCol: 0,
      endRow: TOTAL_ROWS - 1,
      endCol: TOTAL_COLS - 1,
      isRange: true
    });
  };

  const handleSave = () => {
    const dataBlob = new Blob([JSON.stringify(cellData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spreadsheet_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadData = (data) => {
    if (!Array.isArray(data) || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const newData = {};
    
    headers.forEach((header, colIndex) => {
      if (colIndex < TOTAL_COLS) {
        newData[`0,${colIndex}`] = header;
      }
    });
    
    data.forEach((row, rowIndex) => {
      if (rowIndex + 1 < TOTAL_ROWS) {
        headers.forEach((header, colIndex) => {
          if (colIndex < TOTAL_COLS) {
            newData[`${rowIndex + 1},${colIndex}`] = String(row[header] ?? '');
          }
        });
      }
    });
    
    setCellData(newData);
    addToHistory(newData);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [selected, isSelecting]);

  const totalScrollHeight = TOTAL_ROWS * ROW_HEIGHT;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        onLoadData={handleLoadData} 
        onFontChange={setFontFamily}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onSave={handleSave}
        onCopy={handleCopy}
        onPaste={handlePaste}
        onCut={handleCut}
      />
      
      <div className="formula-bar" style={{
        display: 'flex',
        padding: '8px',
        background: '#eee',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div className="cell-label" style={{ fontWeight: 'bold', minWidth: '60px' }}>
          {getColLetter(selected.c)}{selected.r + 1}
        </div>
        <input
          className="formula-input"
          type="text"
          value={cellData[`${selected.r},${selected.c}`] || ''}
          onChange={handleEdit}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '4px' }}
          placeholder="Enter cell value..."
        />
      </div>

      {stats && <StatsPanel stats={stats} selection={selection} />}

      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        padding: '5px',
        height: 'calc(100vh - 180px)' 
      }}>
        <div style={{ position: 'relative' }}>
          <canvas
            ref={canvasRef}
            style={{
              border: '2px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'cell',
              display: 'flex'
            }}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          />
          
          <div
            ref={scrollContainerRef}
            style={{
              position: 'absolute',
              right: -20,
              top: 0,
              width: 20,
              height: CANVAS_HEIGHT,
              overflowY: 'scroll',
              overflowX: 'hidden'
            }}
            onScroll={handleScroll}
          >
            <div style={{ height: totalScrollHeight, width: 1 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
