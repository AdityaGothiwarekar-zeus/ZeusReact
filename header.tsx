import React, { useState, useRef } from "react";
import "./dashboard.css";

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

interface HeaderProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alerts: Alert[];
  announcements: Announcement[];
}

const Header: React.FC<HeaderProps> = ({
  activeIndex,
  setActiveIndex,
  isMenuOpen,
  setIsMenuOpen,
  alerts,
  announcements,
}) => {
  const [isAlertHovered, setIsAlertHovered] = useState(false);
  const [isAnnouncementHovered, setIsAnnouncementHovered] = useState(false);
  const alertTimeout = useRef<NodeJS.Timeout | null>(null);
  const announcementTimeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="header-nav">
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
            <div className="nav-links-desktop">
              {["DASHBOARD", "CONTENT", "USERS", "REPORTS", "ADMIN"].map(
                (label, index) => (
                  <a
                    key={label}
                    className={activeIndex === index ? "active" : ""}
                    onClick={() => setActiveIndex(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {label}
                  </a>
                )
              )}
            </div>
          </nav>

          <div className="top-icons" style={{ position: "relative" }}>
            {/* Alerts Dropdown */}
            <div
              className="icon-dropdown-wrapper"
              onMouseEnter={() => {
                if (alertTimeout.current) clearTimeout(alertTimeout.current);
                setIsAlertHovered(true);
              }}
              onMouseLeave={() => {
                alertTimeout.current = setTimeout(() => setIsAlertHovered(false), 150);
              }}
              style={{ padding: "10px" }}
            >
              <div className="icon-with-badge">
                <img
                  src={
                    isAlertHovered
                      ? "assets/images/icons8-notification.svg"
                      : "assets/icons/alerts.svg"
                  }
                  alt="Notifications"
                />
                {!isAlertHovered && <span className="badge">1</span>}
              </div>
              {isAlertHovered && (
                <div className="alert-dropdown-menu">
                  <div className="alert-scrollable">
                    {alerts.map((alert, idx) => (
                      <div
                        key={alert.id}
                        className={`alert-card ${
                          [1, 3, 5].includes(idx) ? "highlight" : ""
                        }`}
                      >
                        <div className="alert-title">{alert.title}</div>
                        {alert.desc && (
                          <div className="alert-subtext">
                            {alert.label}:{" "}
                            <span className="alert-value">{alert.desc}</span>
                          </div>
                        )}
                        <img
                          src={
                            alert.icon === "tick"
                              ? "/assets/images/tick.svg"
                              : "/assets/images/untick.svg"
                          }
                          className="alert-status"
                          alt="status"
                        />
                        <div className="alert-time">{alert.timestamp}</div>
                      </div>
                    ))}
                  </div>
                  <div className="alert-footer">
                    <button className="show-all-btn">SHOW ALL</button>
                  </div>
                </div>
              )}
            </div>

            {/* Announcements Dropdown */}
            <div
              className="icon-dropdown-wrapper"
              onMouseEnter={() => {
                if (announcementTimeout.current) clearTimeout(announcementTimeout.current);
                setIsAnnouncementHovered(true);
              }}
              onMouseLeave={() => {
                announcementTimeout.current = setTimeout(
                  () => setIsAnnouncementHovered(false),
                  150
                );
              }}
              style={{ padding: "10px" }}
            >
              <div className="icon-with-badge">
                <img
                  src={
                    isAnnouncementHovered
                      ? "assets/icons/icons8-announcement-30.svg"
                      : "assets/icons/announcements.svg"
                  }
                  alt="Announcements"
                />
                {!isAnnouncementHovered && <span className="badge">2</span>}
              </div>
              {isAnnouncementHovered && (
                <div className="announcement-dropdown">
                  <div className="announcement-scrollable">
                    {announcements.map((a) => (
                      <div
                        key={a.id}
                        className={`announcement-item ${
                          a.highlight ? "highlight" : ""
                        }`}
                      >
                        <div className="announcement-text">
                          <div className="announcement-sender">{a.sender}</div>
                          <div className="announcement-title">{a.title}</div>
                          <div className="announcement-meta">
                            {a.desc ? (
                              <span className="attachment-info">
                                <img
                                  src="/assets/images/attachment-svgrepo-com.svg"
                                  alt="attachment"
                                  className="clip-icon"
                                />
                                {a.desc}
                              </span>
                            ) : (
                              <span></span>
                            )}
                            <span className="timestamp">{a.timestamp}</span>
                          </div>
                        </div>
                        <img
                          src={
                            a.icon === "tick"
                              ? "/assets/images/tick.svg"
                              : "/assets/images/untick.svg"
                          }
                          alt={a.icon}
                          className="announcement-icon"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="announcement-actions">
                    <button className="show-all-btn">SHOW ALL</button>
                    <button className="create-new-btn">CREATE NEW</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Icon */}
            <div className="icon-with-badge">
              <img
                src="assets/images/image (2).svg"
                alt="Profile"
                style={{ borderRadius: "50%", border: "2px solid green" }}
              />
              <span
                className="badge"
                style={{ backgroundColor: "white", color: "black" }}
              >
                T
              </span>
            </div>

            {/* Hamburger */}
            <div
              className="hamburger-dropdown-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src={
                  isMenuOpen
                    ? "assets/images/icons8-menu.svg"
                    : "assets/icons/hamburger-menu.svg"
                }
                alt="Menu"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;


import React, { useRef, useEffect, useState, useCallback } from 'react';
import "./Grid.css"
import StatsPanel from './ExcelFormulaBar';
import Header from '../Navbar/Header';
import { getColLetter, calculateStats } from '../../Utils'
import { getVisibleRowRange , getVisibleColRange } from '../../Utils';
import { 
  handleColumnSelection, 
  handleRowSelection, 
  getColumnFromHeaderClick, 
  getRowFromHeaderClick,
  isColumnInSelection,
  isRowInSelection ,
  isEntireColumnSelected,  // Add this
  isEntireRowSelected  
} from '../../SelectionHelper';
import { insertRow , insertColumn } from '../../Utils';

const TOTAL_ROWS = 100000;
const TOTAL_COLS = 500; // A-Z columns
const COL_WIDTH = 80;
const ROW_HEIGHT = 24;
const ROW_HEADER_WIDTH = 60;
const COL_HEADER_HEIGHT = 24;
let dpr = window.getdevicePixelRatio || 1;
const CANVAS_WIDTH = 1880;
const CANVAS_HEIGHT = 850;

export default function GridPage() {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cellInputRef = useRef(null);
  const horizontalScrollRef = useRef(null);
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
  const [scrollLeft, setScrollLeft] = useState(0);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isSelecting, setIsSelecting] = useState(false);
  const [history, setHistory] = useState([{}]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [clipboard, setClipboard] = useState(null);
  const [isSelectingColumns, setIsSelectingColumns] = useState(false);
  const [columnSelectionStart, setColumnSelectionStart] = useState(null);
  
  // New state for direct cell editing
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editPosition, setEditPosition] = useState({ x: 0, y: 0 });

  // Add state for tracking pointer/touch
  const [pointerDownId, setPointerDownId] = useState(null);
  const [startSelection, setStartSelection] = useState(null);
  const lastDrawTime = useRef(0);
const drawScheduled = useRef(false);

  const [shiftKey, setShiftKey] = useState(false);
  

  // Add state for auto-scrolling
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);

  // Calculate statistics for current selection
  const stats = calculateStats(cellData, selection);

  // Calculate which rows should be visible based on scroll position
  const visibleRange = getVisibleRowRange(scrollTop, ROW_HEIGHT, CANVAS_HEIGHT, COL_HEADER_HEIGHT, TOTAL_ROWS);
const drawGrid = useCallback(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // Set canvas physical size (scaled by dpr)
  canvas.width = CANVAS_WIDTH * dpr;
  canvas.height = CANVAS_HEIGHT * dpr;

  // Set canvas style size (logical dimensions)
  canvas.style.width = `${CANVAS_WIDTH}px`;
  canvas.style.height = `${CANVAS_HEIGHT}px`;

  // Scale drawing context
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  // Clear and set font
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.font = `14px ${fontFamily}`;
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 0.4 / dpr; // Adjust linewidth for DPR

  const { startRow, endRow } = visibleRange;
  const { startCol, endCol } = getVisibleColRange(scrollLeft, COL_WIDTH, CANVAS_WIDTH, ROW_HEADER_WIDTH, TOTAL_COLS);

  // Pre-calculate selection bounds for optimization
  const minSelRow = Math.min(selection.startRow, selection.endRow);
  const maxSelRow = Math.max(selection.startRow, selection.endRow);
  const minSelCol = Math.min(selection.startCol, selection.endCol);
  const maxSelCol = Math.max(selection.startCol, selection.endCol);
  const isRangeSelection = selection.isRange;

  // Check if we have entire column/row selections for optimization
  const hasEntireColumnSelection = isRangeSelection && minSelRow === 0 && maxSelRow === TOTAL_ROWS - 1;
  const hasEntireRowSelection = isRangeSelection && minSelCol === 0 && maxSelCol === TOTAL_COLS - 1;

  // Draw top-left corner (select all)
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, ROW_HEADER_WIDTH, COL_HEADER_HEIGHT);
  ctx.strokeStyle = '#d8d9db';
  ctx.strokeRect(0, 0, ROW_HEADER_WIDTH, COL_HEADER_HEIGHT);

  // --- Optimized Column Headers ---
  // Draw base background for all headers
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(ROW_HEADER_WIDTH, 0, CANVAS_WIDTH - ROW_HEADER_WIDTH, COL_HEADER_HEIGHT);

  // Calculate visible range of selected columns
  const visibleSelStartCol = Math.max(minSelCol, startCol);
  const visibleSelEndCol = Math.min(maxSelCol, endCol - 1);

  // Draw bulk column header selection background
  if (hasEntireColumnSelection && visibleSelStartCol <= visibleSelEndCol) {
    const selStartX = ROW_HEADER_WIDTH + (visibleSelStartCol - startCol) * COL_WIDTH;
    const selWidth = (visibleSelEndCol - visibleSelStartCol + 1) * COL_WIDTH;
    ctx.fillStyle = '#0F7937'; // Selection color for headers
    ctx.fillRect(selStartX, 0, selWidth, COL_HEADER_HEIGHT);
  }

  // Draw individual column headers (text and borders)
  for (let c = startCol; c < endCol; c++) {
    const x = ROW_HEADER_WIDTH + (c - startCol) * COL_WIDTH;
    if (x >= CANVAS_WIDTH) break;

    const isInSelection = isRangeSelection && c >= minSelCol && c <= maxSelCol;
    const isEntireColumnSelected = hasEntireColumnSelection && isInSelection; // True if this column is part of a bulk selection
    const isCurrentColSelected = (c === selected.c && !isRangeSelection); // True if this is the single selected column

    // Draw individual backgrounds if NOT part of a bulk column selection
    if (!isEntireColumnSelected && (isInSelection || isCurrentColSelected)) {
      ctx.fillStyle = '#caead8'; // Lighter highlight color
      ctx.fillRect(x, 0, COL_WIDTH, COL_HEADER_HEIGHT);
    }

    // Text: White for bulk selected, green for individual highlight, black otherwise
    ctx.fillStyle = isEntireColumnSelected ? 'white' : (isInSelection || isCurrentColSelected ? '#0F7937' : 'black');
    ctx.textAlign = 'center';
    ctx.fillText(getColLetter(c), x + COL_WIDTH / 2, COL_HEADER_HEIGHT / 2);

    // Borders for all columns
    ctx.strokeStyle = '#d8d9db';
    ctx.strokeRect(x, 0, COL_WIDTH, COL_HEADER_HEIGHT);

    // Highlight bottom border for selected columns (bulk or individual)
    if (isEntireColumnSelected || isInSelection || isCurrentColSelected) {
      ctx.strokeStyle = '#0F7937';
      ctx.lineWidth = 2; // Thicker line for highlight
      ctx.beginPath();
      ctx.moveTo(x, COL_HEADER_HEIGHT - 1);
      ctx.lineTo(x + COL_WIDTH, COL_HEADER_HEIGHT - 1);
      ctx.stroke();
      ctx.lineWidth = 0.4 / dpr; // Reset linewidth
    }
  }

  // --- Optimized Row Headers ---
  // Draw base background for all row headers
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, COL_HEADER_HEIGHT, ROW_HEADER_WIDTH, CANVAS_HEIGHT - COL_HEADER_HEIGHT);

  // Draw bulk row header selection background
  const visibleSelStartRow = Math.max(minSelRow, startRow);
  const visibleSelEndRow = Math.min(maxSelRow, endRow - 1);

  if (hasEntireRowSelection && visibleSelStartRow <= visibleSelEndRow) {
    const selStartY = COL_HEADER_HEIGHT + (visibleSelStartRow - startRow) * ROW_HEIGHT;
    const selHeight = (visibleSelEndRow - visibleSelStartRow + 1) * ROW_HEIGHT;
    ctx.fillStyle = '#0F7937'; // Selection color for headers
    ctx.fillRect(0, selStartY, ROW_HEADER_WIDTH, selHeight);
  }

  // Draw individual row headers (text and borders)
  for (let r = startRow; r < endRow; r++) {
    const y = COL_HEADER_HEIGHT + (r - startRow) * ROW_HEIGHT;
    if (y >= CANVAS_HEIGHT) break;

    const isInSelection = isRangeSelection && r >= minSelRow && r <= maxSelRow;
    const isEntireRowSelected = hasEntireRowSelection && isInSelection;
    const isCurrentRowSelected = (r === selected.r && !isRangeSelection);

    // Draw individual backgrounds if NOT part of a bulk row selection
    if (!isEntireRowSelected && (isInSelection || isCurrentRowSelected)) {
      ctx.fillStyle = '#caead8';
      ctx.fillRect(0, y, ROW_HEADER_WIDTH, ROW_HEIGHT);
    }

    // Text
    ctx.fillStyle = isEntireRowSelected ? 'white' : (isInSelection || isCurrentRowSelected ? '#0F7937' : 'black');
    ctx.textAlign = 'right';
    ctx.fillText(r + 1, ROW_HEADER_WIDTH - 5, y + ROW_HEIGHT / 2);

    // Borders
    ctx.strokeStyle = '#d8d9db';
    ctx.strokeRect(0, y, ROW_HEADER_WIDTH, ROW_HEIGHT);

    // Highlight right border for selected rows (bulk or individual)
    if (isEntireRowSelected || isInSelection || isCurrentRowSelected) {
      ctx.strokeStyle = '#0F7937';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ROW_HEADER_WIDTH - 1, y);
      ctx.lineTo(ROW_HEADER_WIDTH - 1, y + ROW_HEIGHT);
      ctx.stroke();
      ctx.lineWidth = 0.4 / dpr;
    }
  }

  // --- Optimized Cells ---
  // 1. Draw base white background for all visible cells (non-selected state)
  ctx.fillStyle = 'white';
  ctx.fillRect(ROW_HEADER_WIDTH, COL_HEADER_HEIGHT, CANVAS_WIDTH - ROW_HEADER_WIDTH, CANVAS_HEIGHT - COL_HEADER_HEIGHT);

  // 2. Draw bulk selection background for entire columns if applicable
  if (hasEntireColumnSelection && visibleSelStartCol <= visibleSelEndCol) {
    const selStartX = ROW_HEADER_WIDTH + (visibleSelStartCol - startCol) * COL_WIDTH;
    const selWidth = (visibleSelEndCol - visibleSelStartCol + 1) * COL_WIDTH;
    const cellAreaHeight = (endRow - startRow) * ROW_HEIGHT;
    ctx.fillStyle = '#f1faf1'; // Lighter selection color for cells
    ctx.fillRect(selStartX, COL_HEADER_HEIGHT, selWidth, cellAreaHeight);
  } else if (hasEntireRowSelection && visibleSelStartRow <= visibleSelEndRow) {
    // If entire row selection, draw bulk background for selected rows
    const selStartY = COL_HEADER_HEIGHT + (visibleSelStartRow - startRow) * ROW_HEIGHT;
    const selHeight = (visibleSelEndRow - visibleSelStartRow + 1) * ROW_HEIGHT;
    const cellAreaWidth = (endCol - startCol) * COL_WIDTH;
    ctx.fillStyle = '#f1faf1';
    ctx.fillRect(ROW_HEADER_WIDTH, selStartY, cellAreaWidth, selHeight);
  }

  // 3. Draw individual cell backgrounds for range selections that are NOT entire column/row
  if (isRangeSelection && !hasEntireColumnSelection && !hasEntireRowSelection) {
    for (let r = visibleSelStartRow; r <= visibleSelEndRow; r++) {
      for (let c = visibleSelStartCol; c <= visibleSelEndCol; c++) {
        const x = ROW_HEADER_WIDTH + (c - startCol) * COL_WIDTH;
        const y = COL_HEADER_HEIGHT + (r - startRow) * ROW_HEIGHT;
        ctx.fillStyle = '#f1faf1'; // Lighter selection color
        ctx.fillRect(x, y, COL_WIDTH, ROW_HEIGHT);
      }
    }
  }

  // 4. Draw individual cell backgrounds for the currently single selected cell
  if (!isRangeSelection && selected.r >= startRow && selected.r < endRow && selected.c >= startCol && selected.c < endCol) {
    const x = ROW_HEADER_WIDTH + (selected.c - startCol) * COL_WIDTH;
    const y = COL_HEADER_HEIGHT + (selected.r - startRow) * ROW_HEIGHT;
    ctx.fillStyle = '#f1faf1';
    ctx.fillRect(x, y, COL_WIDTH, ROW_HEIGHT);
  }

  // 5. Draw cell content and borders (optimized to skip if part of bulk selection where content is uniform)
  ctx.strokeStyle = '#d8d9db';
  ctx.lineWidth = 0.4;
  ctx.textAlign = 'left';
  ctx.fillStyle = 'black';

  for (let r = startRow; r < endRow; r++) {
    const y = COL_HEADER_HEIGHT + (r - startRow) * ROW_HEIGHT;
    if (y >= CANVAS_HEIGHT) break;

    for (let c = startCol; c < endCol; c++) {
      const x = ROW_HEADER_WIDTH + (c - startCol) * COL_WIDTH;
      if (x >= CANVAS_WIDTH) break;

      const key = `${r},${c}`;
      const isCurrent = r === selected.r && c === selected.c;

      // Draw borders for all cells
      ctx.strokeRect(x + 0.5, y + 0.5, COL_WIDTH - 1, ROW_HEIGHT - 1);

      // Draw cell content only if not editing and value exists
      const val = cellData[key];
      if (val && !(isEditing && isCurrent)) {
        ctx.fillText(String(val).substring(0, 10), x + 4, y + ROW_HEIGHT / 2);
      }
    }
  }

  // --- Selection Border ---
  ctx.strokeStyle = '#0F7937';
  ctx.lineWidth = 2;

  if (selection.isRange) {
    const selStartRow = Math.max(selection.startRow, startRow);
    const selEndRow = Math.min(selection.endRow, endRow - 1);
    const selStartCol = Math.max(selection.startCol, startCol);
    const selEndCol = Math.min(selection.endCol, endCol - 1);

    if (selStartRow <= selEndRow && selStartCol <= selEndCol) {
      const selStartY = COL_HEADER_HEIGHT + ((selStartRow - startRow) * ROW_HEIGHT);
      const selEndY = COL_HEADER_HEIGHT + ((selEndRow - startRow + 1) * ROW_HEIGHT);
      const selStartX = ROW_HEADER_WIDTH + ((selStartCol - startCol) * COL_WIDTH);
      const selEndX = ROW_HEADER_WIDTH + ((selEndCol - startCol + 1) * COL_WIDTH); // Corrected end X
      const selWidth = selEndX - selStartX;

      ctx.strokeRect(selStartX, selStartY, selWidth, selEndY - selStartY);
    }
  } else {
    // Single cell border
    if (selected.r >= startRow && selected.r < endRow && selected.c >= startCol && selected.c < endCol) {
      const selY = COL_HEADER_HEIGHT + ((selected.r - startRow) * ROW_HEIGHT);
      const selX = ROW_HEADER_WIDTH + ((selected.c - startCol) * COL_WIDTH);
      ctx.strokeRect(selX, selY, COL_WIDTH, ROW_HEIGHT);
    }
  }
}, [cellData, selected, selection, scrollLeft, fontFamily, visibleRange, isEditing, TOTAL_ROWS, TOTAL_COLS, ROW_HEIGHT, COL_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT, ROW_HEADER_WIDTH, COL_HEADER_HEIGHT]);
// Throttled draw function to prevent excessive redraws during column selection
const throttledDraw = useCallback(() => {
  if (drawScheduled.current) return;
  
  drawScheduled.current = true;
  requestAnimationFrame(() => {
    const now = performance.now();
    if (now - lastDrawTime.current >= 16) { // ~60fps
      drawGrid();
      lastDrawTime.current = now;
    }
    drawScheduled.current = false;
  });
}, [drawGrid]);
// Replace the existing useEffect that calls drawGrid
useEffect(() => {
  window.addEventListener('resize', throttledDraw);
  window.addEventListener('scroll', throttledDraw);
  throttledDraw(); // Use throttled version

  return () => {
    window.removeEventListener('resize', throttledDraw);
    window.removeEventListener('scroll', throttledDraw);
  };
}, [throttledDraw]);


  const addToHistory = useCallback((newData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...newData });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // startEditing cells
  const startEditing = useCallback((row, col) => {
    const { startRow } = visibleRange;
    const { startCol } = getVisibleColRange(scrollLeft, COL_WIDTH, CANVAS_WIDTH, ROW_HEADER_WIDTH, TOTAL_COLS);
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const x = canvasRect.left + ROW_HEADER_WIDTH + ((col - startCol) * COL_WIDTH);
    const y = canvasRect.top + COL_HEADER_HEIGHT + ((row - startRow) * ROW_HEIGHT);

    const key = `${row},${col}`;
    const currentValue = cellData[key] || '';

    setEditValue(currentValue);
    setEditPosition({ x, y });
    setIsEditing(true);
    
    // Focus the input after state update
    setTimeout(() => {
      if (cellInputRef.current) {
        cellInputRef.current.focus();
      }
    }, 0);
  }, [cellData, visibleRange, scrollLeft]);

  const finishEditing = useCallback((save = true, moveToNext = false) => {
    if (!isEditing) return;

    if (save) {
      const key = `${selected.r},${selected.c}`;
      const newData = { ...cellData };
      
      if (editValue.trim() === '') {
        delete newData[key];
      } else {
        newData[key] = editValue;
      }
      
      setCellData(newData);
      addToHistory(newData);
    }

    setIsEditing(false);
    setEditValue('');
    
    // Move to next row if requested and not at the bottom
    if (moveToNext && selected.r < TOTAL_ROWS - 1) {
      const newRow = selected.r + 1;
      const newCol = selected.c;
      
      // Update selection immediately
      setSelected({ r: newRow, c: newCol });
      setSelection({
        startRow: newRow,
        startCol: newCol,
        endRow: newRow,
        endCol: newCol,
        isRange: false
      });
      
      // Handle scrolling
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          const rowPosition = newRow * ROW_HEIGHT;
          const containerHeight = CANVAS_HEIGHT - COL_HEADER_HEIGHT;
          const currentScrollTop = scrollContainerRef.current.scrollTop;
          const visibleEnd = currentScrollTop + containerHeight;
          
          // Check if we need to scroll down
          if (rowPosition + ROW_HEIGHT > visibleEnd) {
            const newScrollTop = rowPosition - containerHeight + ROW_HEIGHT;
            scrollContainerRef.current.scrollTop = newScrollTop;
          }
          // Check if we need to scroll up (shouldn't happen with Enter, but just in case)
          else if (rowPosition < currentScrollTop) {
            scrollContainerRef.current.scrollTop = rowPosition;
          }
        }
        
        // Handle horizontal scrolling if needed
        if (horizontalScrollRef.current) {
          const colPosition = newCol * COL_WIDTH;
          const containerWidth = CANVAS_WIDTH - ROW_HEADER_WIDTH;
          const currentScrollLeft = horizontalScrollRef.current.scrollLeft;
          const visibleRightEnd = currentScrollLeft + containerWidth;
          
          if (colPosition + COL_WIDTH > visibleRightEnd) {
            horizontalScrollRef.current.scrollLeft = colPosition - containerWidth + COL_WIDTH;
          } else if (colPosition < currentScrollLeft) {
            horizontalScrollRef.current.scrollLeft = colPosition;
          }
        }
        
        // Return focus to canvas
        if (canvasRef.current) {
          canvasRef.current.focus();
        }
      });
    } else {
      // Return focus to canvas immediately if not moving
      requestAnimationFrame(() => {
        if (canvasRef.current) {
          canvasRef.current.focus();
        }
      });
    }
  }, [isEditing, editValue, selected, cellData, addToHistory, TOTAL_ROWS, ROW_HEIGHT, CANVAS_HEIGHT, COL_HEADER_HEIGHT, ROW_HEADER_WIDTH, CANVAS_WIDTH, COL_WIDTH]);

  // Helper function to get cell coordinates from pointer event
  const getCellFromPointer = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < ROW_HEADER_WIDTH || y < COL_HEADER_HEIGHT) return null;

    const { startCol } = getVisibleColRange(scrollLeft, COL_WIDTH, CANVAS_WIDTH, ROW_HEADER_WIDTH, TOTAL_COLS);
    const canvasColIndex = Math.floor((x - ROW_HEADER_WIDTH) / COL_WIDTH);
    const c = startCol + canvasColIndex;
    
    const canvasRowIndex = Math.floor((y - COL_HEADER_HEIGHT) / ROW_HEIGHT);
    const { startRow } = visibleRange;
    const r = startRow + canvasRowIndex;

    if (c >= 0 && c < TOTAL_COLS && r >= 0 && r < TOTAL_ROWS) {
      return { r, c };
    }
    return null;
  }, [visibleRange, scrollLeft]);

  // Pointer event handlers
  const handlePointerDown = useCallback((e) => {
  console.log("pointer down", e.pointerId);
  
  // Prevent default to avoid text selection and other browser behaviors
  e.preventDefault();
  
  const rect = canvasRef.current?.getBoundingClientRect();
  if (!rect) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Store shift key state
  setShiftKey(e.shiftKey);

  // If we're currently editing, finish editing first
  if (isEditing) {
    finishEditing(true);
  }

  // Check for column header click
  const colIndex = getColumnFromHeaderClick(x, y, ROW_HEADER_WIDTH, COL_HEADER_HEIGHT, COL_WIDTH, TOTAL_COLS);
  if (colIndex !== null) {
    const { startCol } = getVisibleColRange(scrollLeft, COL_WIDTH, CANVAS_WIDTH, ROW_HEADER_WIDTH, TOTAL_COLS);
    const actualColIndex = startCol + colIndex;
    
    // Start column selection
    setIsSelectingColumns(true);
    setColumnSelectionStart(actualColIndex);
    setPointerDownId(e.pointerId);
    
    // Set initial selection to this column
    setSelection({
      startRow: 0,
      startCol: actualColIndex,
      endRow: TOTAL_ROWS - 1,
      endCol: actualColIndex,
      isRange: false
    });
    setSelected({ r: 0, c: actualColIndex });
    
    // Capture the pointer
    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
    
    return;
  }

  // Check for row header click
  const rowIndex = getRowFromHeaderClick(x, y, ROW_HEADER_WIDTH, COL_HEADER_HEIGHT, ROW_HEIGHT, visibleRange.startRow, TOTAL_ROWS);
  if (rowIndex !== null) {
    handleRowSelection(rowIndex, selection, setSelection, setSelected, TOTAL_COLS);
    return;
  }

  // Regular cell selection
  const cell = getCellFromPointer(e);
  if (!cell) return;

  const { r, c } = cell;

  // Capture the pointer
  if (canvasRef.current) {
    canvasRef.current.setPointerCapture(e.pointerId);
  }

  setPointerDownId(e.pointerId);
  setStartSelection({ r, c });
  setSelected({ r, c });
  setSelection({ 
    startRow: r, 
    startCol: c, 
    endRow: r, 
    endCol: c, 
    isRange: false 
  });
  setIsSelecting(true);
}, [getCellFromPointer, isEditing, finishEditing, selection, visibleRange, scrollLeft]);

  const handlePointerMove = useCallback((e) => {
  if (isEditing || e.pointerId !== pointerDownId) return;
  
  const rect = canvasRef.current?.getBoundingClientRect();
  if (!rect) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Handle column selection dragging
// Handle column selection dragging (replace this section in handlePointerMove)
if (isSelectingColumns && columnSelectionStart !== null) {
  const colIndex = getColumnFromHeaderClick(x, y, ROW_HEADER_WIDTH, COL_HEADER_HEIGHT, COL_WIDTH, TOTAL_COLS);
  if (colIndex !== null) {
    const { startCol } = getVisibleColRange(scrollLeft, COL_WIDTH, CANVAS_WIDTH, ROW_HEADER_WIDTH, TOTAL_COLS);
    const actualColIndex = startCol + colIndex;
    
    // Only update if the column actually changed
    const minCol = Math.min(columnSelectionStart, actualColIndex);
    const maxCol = Math.max(columnSelectionStart, actualColIndex);
    
    // Check if selection actually changed to avoid unnecessary renders
    if (selection.startCol !== minCol || selection.endCol !== maxCol) {
      setSelection({
        startRow: 0,
        startCol: minCol,
        endRow: TOTAL_ROWS - 1,
        endCol: maxCol,
        isRange: minCol !== maxCol
      });
      
      // Set selected cell to the start of selection
      setSelected({ r: 0, c: columnSelectionStart });
    }
  }
  return;
}

  // Regular cell selection logic (existing code)
  if (!isSelecting || !startSelection) return;
  
  // Calculate scroll values
  const totalScrollHeight = TOTAL_ROWS * ROW_HEIGHT;
  const totalScrollWidth = TOTAL_COLS * COL_WIDTH;

  // Auto-scroll logic
  const scrollSpeed = 20; // pixels per scroll
  const scrollZone = 50; // pixels from edge to trigger scroll
  let shouldScrollLeft = false;
  let shouldScrollRight = false;
  let shouldScrollUp = false;
  let shouldScrollDown = false;

  // Check horizontal scroll zones
  if (x < ROW_HEADER_WIDTH + scrollZone && x > ROW_HEADER_WIDTH) {
    shouldScrollLeft = true;
  } else if (x > CANVAS_WIDTH - scrollZone) {
    shouldScrollRight = true;
  }

  // Check vertical scroll zones
  if (y < COL_HEADER_HEIGHT + scrollZone && y > COL_HEADER_HEIGHT) {
    shouldScrollUp = true;
  } else if (y > CANVAS_HEIGHT - scrollZone) {
    shouldScrollDown = true;
  }

  // Clear existing auto-scroll
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    setAutoScrollInterval(null);
  }

  // Start auto-scrolling if needed
  if (shouldScrollLeft || shouldScrollRight || shouldScrollUp || shouldScrollDown) {
    const interval = setInterval(() => {
      if (shouldScrollLeft && horizontalScrollRef.current) {
        const newScrollLeft = Math.max(0, horizontalScrollRef.current.scrollLeft - scrollSpeed);
        horizontalScrollRef.current.scrollLeft = newScrollLeft;
        setScrollLeft(newScrollLeft);
      }
      if (shouldScrollRight && horizontalScrollRef.current) {
        const maxScrollLeft = totalScrollWidth - (CANVAS_WIDTH - ROW_HEADER_WIDTH);
        const newScrollLeft = Math.min(maxScrollLeft, horizontalScrollRef.current.scrollLeft + scrollSpeed);
        horizontalScrollRef.current.scrollLeft = newScrollLeft;
        setScrollLeft(newScrollLeft);
      }
      if (shouldScrollUp && scrollContainerRef.current) {
        const newScrollTop = Math.max(0, scrollContainerRef.current.scrollTop - scrollSpeed);
        scrollContainerRef.current.scrollTop = newScrollTop;
        setScrollTop(newScrollTop);
      }
      if (shouldScrollDown && scrollContainerRef.current) {
        const maxScrollTop = totalScrollHeight - (CANVAS_HEIGHT - COL_HEADER_HEIGHT);
        const newScrollTop = Math.min(maxScrollTop, scrollContainerRef.current.scrollTop + scrollSpeed);
        scrollContainerRef.current.scrollTop = newScrollTop;
        setScrollTop(newScrollTop);
      }
    }, 50); // Scroll every 50ms
    
    setAutoScrollInterval(interval);
  }

  // Get cell coordinates
  const cell = getCellFromPointer(e);
  if (!cell) {
    // If pointer is outside cell area but we're scrolling, 
    // calculate the cell based on current position
    if (shouldScrollLeft || shouldScrollRight || shouldScrollUp || shouldScrollDown) {
      const { startCol } = getVisibleColRange(scrollLeft, COL_WIDTH, CANVAS_WIDTH, ROW_HEADER_WIDTH, TOTAL_COLS);
      const { startRow } = visibleRange;
      
      let targetCol = startCol;
      let targetRow = startRow;
      
      if (shouldScrollLeft) {
        targetCol = Math.max(0, startCol - 1);
      } else if (shouldScrollRight) {
        targetCol = Math.min(TOTAL_COLS - 1, startCol + Math.floor((CANVAS_WIDTH - ROW_HEADER_WIDTH) / COL_WIDTH));
      }
      
      if (shouldScrollUp) {
        targetRow = Math.max(0, startRow - 1);
      } else if (shouldScrollDown) {
        targetRow = Math.min(TOTAL_ROWS - 1, startRow + Math.floor((CANVAS_HEIGHT - COL_HEADER_HEIGHT) / ROW_HEIGHT));
      }
      
      // Update selection with calculated cell
      const newSelection = {
        startRow: Math.min(startSelection.r, targetRow),
        endRow: Math.max(startSelection.r, targetRow),
        startCol: Math.min(startSelection.c, targetCol),
        endCol: Math.max(startSelection.c, targetCol),
        isRange: startSelection.r !== targetRow || startSelection.c !== targetCol
      };
      setSelection(newSelection);
    }
    return;
  }

  const { r, c } = cell;

  // Update selection
  const newSelection = {
    startRow: Math.min(startSelection.r, r),
    endRow: Math.max(startSelection.r, r),
    startCol: Math.min(startSelection.c, c),
    endCol: Math.max(startSelection.c, c),
    isRange: startSelection.r !== r || startSelection.c !== c
  };
  setSelection(newSelection);
}, [isSelecting, isEditing, pointerDownId, startSelection, getCellFromPointer, autoScrollInterval, scrollLeft, visibleRange, isSelectingColumns, columnSelectionStart]);

  const handlePointerUp = useCallback((e) => {
  if (e.pointerId === pointerDownId) {
    console.log("pointer up", e.pointerId);
    
    // Handle column selection completion
    if (isSelectingColumns) {
      console.log("Column selection completed");
      // Save data from selected columns
      setIsSelectingColumns(false);
      setColumnSelectionStart(null);
    }
    
    setIsSelecting(false);
    setPointerDownId(null);
    setStartSelection(null);
    setShiftKey(false);
    
    // Clear auto-scroll interval
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
    
    // Release pointer capture
    if (canvasRef.current) {
      canvasRef.current.releasePointerCapture(e.pointerId);
    }
  }
}, [pointerDownId, autoScrollInterval, isSelectingColumns]);
  const handlePointerCancel = useCallback((e) => {
  if (e.pointerId === pointerDownId) {
    console.log("pointer cancel", e.pointerId);
    setIsSelecting(false);
    setIsSelectingColumns(false);
    setColumnSelectionStart(null);
    setPointerDownId(null);
    setStartSelection(null);
    setShiftKey(false);
    
    // Clear auto-scroll interval
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
  }
}, [pointerDownId, autoScrollInterval]);
  // Double click/tap handler
  const handleDoubleClick = useCallback((e) => {
    const cell = getCellFromPointer(e);
    if (!cell) return;

    const { r, c } = cell;
    startEditing(r, c);
  }, [getCellFromPointer, startEditing]);

  // Add cleanup effect for auto-scroll interval
  useEffect(() => {
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [autoScrollInterval]);

  // Auto-scroll effect for selection changes
  useEffect(() => {
    if (!isEditing && scrollContainerRef.current && horizontalScrollRef.current) {
      const rowPosition = selected.r * ROW_HEIGHT;
      const containerHeight = CANVAS_HEIGHT - COL_HEADER_HEIGHT;
      const currentScrollTop = scrollContainerRef.current.scrollTop;
      const visibleEnd = currentScrollTop + containerHeight;
      
      // Auto-scroll vertically if needed
      if (rowPosition + ROW_HEIGHT > visibleEnd) {
        scrollContainerRef.current.scrollTop = rowPosition - containerHeight + ROW_HEIGHT;
      } else if (rowPosition < currentScrollTop) {
        scrollContainerRef.current.scrollTop = rowPosition;
      }
      
      // Auto-scroll horizontally if needed
      const colPosition = selected.c * COL_WIDTH;
      const containerWidth = CANVAS_WIDTH - ROW_HEADER_WIDTH;
      const currentScrollLeft = horizontalScrollRef.current.scrollLeft;
      const visibleRightEnd = currentScrollLeft + containerWidth;
      
      if (colPosition + COL_WIDTH > visibleRightEnd) {
        horizontalScrollRef.current.scrollLeft = colPosition - containerWidth + COL_WIDTH;
      } else if (colPosition < currentScrollLeft) {
        horizontalScrollRef.current.scrollLeft = colPosition;
      }
    }
  }, [selected.r, selected.c, isEditing]);

  const handleKeyDown = (e) => {
    // If we're editing, handle edit-specific keys
    if (isEditing) {
      if (e.key === 'Enter') {
        e.preventDefault();
        finishEditing(true, true); // Save and move to next row
      } else if (e.key === 'Escape') {
        e.preventDefault();
        finishEditing(false); // Cancel without saving
      }
      return;
    }

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
      case 'Enter':
        e.preventDefault();
        // Move down one row when Enter is pressed (Excel-like behavior)
        if (selected.r < TOTAL_ROWS - 1) {
          newSelected.r = selected.r + 1;
        } else {
          // If at bottom, just start editing current cell
          startEditing(selected.r, selected.c);
          return;
        }
        break;
      case 'F2':
        e.preventDefault();
        startEditing(selected.r, selected.c);
        return;
      default:
      // If it's a printable character, start editing
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setEditValue(e.key);
        startEditing(selected.r, selected.c);
      }
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
  
  // Auto-scroll logic for arrow keys and Enter
  setTimeout(() => {
    if (scrollContainerRef.current && horizontalScrollRef.current) {
      // Vertical scrolling
      const rowPosition = newSelected.r * ROW_HEIGHT;
      const containerHeight = CANVAS_HEIGHT - COL_HEADER_HEIGHT;
      const visibleStart = scrollTop;
      const visibleEnd = scrollTop + containerHeight;
      
      if (rowPosition < visibleStart) {
        scrollContainerRef.current.scrollTop = rowPosition;
      } else if (rowPosition + ROW_HEIGHT > visibleEnd) {
        scrollContainerRef.current.scrollTop = rowPosition - containerHeight + ROW_HEIGHT;
      }
      
      // Horizontal scrolling
      const colPosition = newSelected.c * COL_WIDTH;
      const containerWidth = CANVAS_WIDTH - ROW_HEADER_WIDTH;
      const visibleLeftStart = scrollLeft;
      const visibleLeftEnd = scrollLeft + containerWidth;
      
      if (colPosition < visibleLeftStart) {
        horizontalScrollRef.current.scrollLeft = colPosition;
      } else if (colPosition + COL_WIDTH > visibleLeftEnd) {
        horizontalScrollRef.current.scrollLeft = colPosition - containerWidth + COL_WIDTH;
      }
    }
  }, 0);
};

// Replace your handleScroll function with this:
const handleVerticalScroll = (e) => {
  setScrollTop(e.target.scrollTop);
  
  // If editing, close the editor when scrolling
  if (isEditing) {
    finishEditing(true);
  }
};

const handleHorizontalScroll = (e) => {
  setScrollLeft(e.target.scrollLeft);
  
  // If editing, close the editor when scrolling
  if (isEditing) {
    finishEditing(true);
  }
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
    // const dataBlob = new Blob([JSON.stringify(cellData, null, 2)], {
    //   type: 'application/json'
    // });
    // const url = URL.createObjectURL(dataBlob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'spreadsheet_data.json';
    // a.click();
    // URL.revokeObjectURL(url);
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

  // Updated useEffect for event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      console.log("add pointer listeners");
      
      // Add pointer event listeners
      canvas.addEventListener('pointerdown', handlePointerDown);
      canvas.addEventListener('pointermove', handlePointerMove);
      canvas.addEventListener('pointerup', handlePointerUp);
      canvas.addEventListener('pointercancel', handlePointerCancel);
      canvas.addEventListener('dblclick', handleDoubleClick);

      // Prevent context menu on right click
      canvas.addEventListener('contextmenu', (e) => e.preventDefault());
      
      return () => {
        console.log("remove pointer listeners");
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerup', handlePointerUp);
        canvas.removeEventListener('pointercancel', handlePointerCancel);
        canvas.removeEventListener('dblclick', handleDoubleClick);
        canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
      };
    }
  }, [handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel, handleDoubleClick]);

const totalScrollHeight = TOTAL_ROWS * ROW_HEIGHT;
const totalScrollWidth = TOTAL_COLS * COL_WIDTH;

return (
  <div className="spreadsheet-container">
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
      cellData={cellData}
      selected={selected}
      setCellData={setCellData}
      addToHistory={addToHistory}
      setSelected={setSelected}
    />

    <div className="toolbar">
      <div className="cell-indicator">
        {getColLetter(selected.c)}{selected.r + 1}
      </div>
      <div className="cell-preview">
        {isEditing ? 'Editing...' : `${cellData[`${selected.r},${selected.c}`] || ''}`}
      </div>
    </div>

    {stats && <StatsPanel stats={stats} selection={selection} />}

    <div className="canvas-wrapper">
      <div className="canvas-inner">
        <canvas
          ref={canvasRef}
          className="grid-canvas"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{ touchAction: 'none' }} // Prevents default touch behaviors
        />

        <div
          ref={scrollContainerRef}
          className="vertical-scroll"
          onScroll={handleVerticalScroll}
        >
          <div style={{ height: totalScrollHeight, width: 1 }} className="scroll-spacer" />
        </div>

        <div
  ref={horizontalScrollRef}
  className="horizontal-scroll"
  onScroll={handleHorizontalScroll}
>
  <div style={{ width: totalScrollWidth, height: 1 }} className="scroll-spacer" />
</div>


        {isEditing && (
          <input
            ref={cellInputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              finishEditing(true, true);
            } else if (e.key === 'Escape') {
              e.preventDefault();
              e.stopPropagation();
              finishEditing(false);
            }
          }}
            onBlur={() => finishEditing(true)}
            className="cell-input"
            style={{
              left: editPosition.x,
              top: editPosition.y,
              width: COL_WIDTH - 10,
              height: ROW_HEIGHT - 2,
              fontFamily: fontFamily
            }}
          />
        )}
      </div>
    </div>
  </div>
);
//////////////////////////////////////////////moving ants part//////////////////////////////////////////////////////////////////////////////////////////////////////////



// 1. ADD THESE NEW STATE VARIABLES (put after your existing useState declarations)

const [copiedSelection, setCopiedSelection] = useState(null);
const [antsAnimationOffset, setAntsAnimationOffset] = useState(0);

// 2. ADD THIS NEW USEEFFECT FOR ANIMATION (put after your existing useEffect declarations)

useEffect(() => {
  let animationId;
  
  if (copiedSelection) {
    const animate = () => {
      setAntsAnimationOffset(prev => (prev + 1) % 16); // 16px pattern cycle
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
  }
  
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}, [copiedSelection]);

// 3. UPDATE YOUR DRAWGRID FUNCTION - ADD THIS CODE BEFORE THE CLOSING BRACKET OF drawGrid

// === Moving Ants Animation for Copied Cells ===
if (copiedSelection) {
  const { startRow, startCol, endRow, endCol } = copiedSelection;
  
  // Check if copied selection is visible
  const visibleStartRow = Math.max(startRow, startRow);
  const visibleEndRow = Math.min(endRow, endRow);
  const visibleStartCol = Math.max(startCol, startCol);
  const visibleEndCol = Math.min(endCol, endCol);

  if (visibleStartRow <= visibleEndRow && visibleStartCol <= visibleEndCol) {
    // Calculate positions for copied selection
    let copyStartY = COL_HEADER_HEIGHT;
    let copyEndY = COL_HEADER_HEIGHT;
    
    scrollOffsetY = 0;
    for (let r = 0; r < startRow; r++) {
      scrollOffsetY += rowHeights.get(r) || ROW_HEIGHT;
    }
    copyStartY -= (scrollTop - scrollOffsetY);

    for (let r = startRow; r <= startRow; r++) {
      if (r === startRow) break;
      copyStartY += rowHeights.get(r) || ROW_HEIGHT;
    }

    copyEndY = copyStartY;
    for (let r = startRow; r <= endRow; r++) {
      copyEndY += rowHeights.get(r) || ROW_HEIGHT;
    }

    let copyStartX = ROW_HEADER_WIDTH;
    let copyWidth = 0;

    scrollOffsetX = 0;
    for (let c = 0; c < startCol; c++) {
      scrollOffsetX += colWidths.get(c) || COL_WIDTH;
    }
    copyStartX -= (scrollLeft - scrollOffsetX);

    for (let c = startCol; c <= startCol; c++) {
      if (c === startCol) break;
      copyStartX += colWidths.get(c) || COL_WIDTH;
    }

    for (let c = startCol; c <= endCol; c++) {
      copyWidth += colWidths.get(c) || COL_WIDTH;
    }

    // Draw moving ants border
    if (copyStartY >= COL_HEADER_HEIGHT && copyStartX >= ROW_HEADER_WIDTH) {
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.lineDashOffset = -antsAnimationOffset;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(copyStartX, copyStartY, copyWidth, copyEndY - copyStartY);
      ctx.restore();
    }
  }
}

// 4. UPDATE YOUR HANDLECOPY FUNCTION (replace your existing handleCopy function)

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
  
  // Set copied selection for animation
  setCopiedSelection({
    startRow: selection.startRow,
    startCol: selection.startCol,
    endRow: selection.endRow,
    endCol: selection.endCol
  });
};

// 5. UPDATE YOUR HANDLECUT FUNCTION (replace your existing handleCut function)

const handleCut = () => {
  handleCopy();
  setClipboard(prev => ({ ...prev, cut: true }));
  handleDelete();
  
  // Don't show animation for cut (since cells are deleted)
  setCopiedSelection(null);
};

// 6. UPDATE YOUR HANDLEPASTE FUNCTION (replace your existing handlePaste function)

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
  
  // Clear copied selection animation after paste
  setCopiedSelection(null);
};

// 7. ADD THIS NEW FUNCTION TO CLEAR COPY SELECTION (put with your other handler functions)

const clearCopySelection = () => {
  setCopiedSelection(null);
};

// 8. UPDATE YOUR HANDLEPOINTERDOWN FUNCTION - ADD THIS LINE AT THE BEGINNING

const handlePointerDown = useCallback((e) => {
  // Clear copy selection when starting new selection
  setCopiedSelection(null);
  
  // ... rest of your existing handlePointerDown code
}, [/* your existing dependencies */]);

// 9. UPDATE YOUR HANDLEKEYDOWN FUNCTION - ADD THIS CASE IN THE SWITCH STATEMENT

case 'Escape':
  e.preventDefault();
  clearCopySelection();
  return;
////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////////////////////
import React, { forwardRef, useEffect, useRef } from "react";
import {
  getParallelogramPath,
  getTrianglePath,
  getHexagonPath,
} from "../Utils";
import "../App.css"

const getSnapOffsets = {
  parallelogram: { x: 85, y: 90 },
  triangle: { x: 97, y: 6 },
  hexagon: { x: 250, y: 150 },
};

const getFillColor = (type) => {
  switch (type) {
    case "parallelogram":
      return "#b36232";
    case "triangle":
      return "#346819";
    case "hexagon":
      return "#2a75a3";
    default:
      return "gray";
  }
};

const Canvas = forwardRef(({ droppedShapes = [] }, ref) => {
  const innerRef = useRef(null);
  const canvasRef = ref || innerRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const offsetY = 40;

    const shapesMeta = [
      {
        type: "parallelogram",
        path: getParallelogramPath(offsetY),
      },
      {
        type: "triangle",
        path: getTrianglePath(offsetY),
      },
      {
        type: "hexagon",
        path: getHexagonPath(40),
      },
    ];

    for (const { type, path } of shapesMeta) {
      const snap = getSnapOffsets[type];
      const isSnapped = droppedShapes.some(
        (shape) =>
          shape.type === type &&
          shape.rotation === 0 &&
          Math.abs(shape.position.x - snap.x) < 2 &&
          Math.abs(shape.position.y - snap.y) < 2
      );

      ctx.fillStyle = isSnapped ? getFillColor(type) : "rgba(0,0,0,0)";
      ctx.strokeStyle = isSnapped ? getFillColor(type) : "gray";
      ctx.setLineDash(isSnapped ? [] : [5, 5]);
      ctx.lineWidth = 2;

      ctx.fill(path);
      ctx.stroke(path);
    }
  }, [droppedShapes]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="canvas"
      style={{
    position: "absolute", // or relative if inside a relative parent
    left: "120px",         // move to right
    top: "20px",
  }}
    />
  );
});

export default Canvas;

///////////////////////////////////////////////App//////////////////////////////////////////////
// App.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import Canvas from "./Components/Canvas.jsx";
import DraggableShape from "./Components/DraggableShape.jsx";
import PaletteShape from "./Components/PaletteShape.jsx";
import "./App.css";
import { getParallelogramPath, getTrianglePath ,getHexagonPath} from "./Utils.js";

const SHAPE_CONFIG = {
  size: 100,
  rotationTolerance: 10,
  snapOffsets: {
    parallelogram: { x: 85, y: 90 },
    triangle: { x: 97, y: 6 },
    hexagon: { x: 250, y: 150 },
    
  },
};

export default function App() {
  const [droppedShapes, setDroppedShapes] = useState([]);
  const [ghostShape, setGhostShape] = useState(null);
  const [draggingShapeId, setDraggingShapeId] = useState(null);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [placedShapeTypes, setPlacedShapeTypes] = useState([]);

  const canvasRef = useRef(null);
  const dragDataRef = useRef({ isDragging: false, shapeId: null, offset: { x: 0, y: 0 } });
  const rotationDataRef = useRef({
    isRotating: false,
    shapeId: null,
    center: { x: 0, y: 0 },
    startAngle: 0,
    initialRotation: 0,
  });
  const lastValidPositionRef = useRef({});
  const visualPositionRef = useRef({});
  const collisionPauseRef = useRef({}); // New ref to track collision pause state

  const getSnapPosition = (type) => SHAPE_CONFIG.snapOffsets[type] || { x: 0, y: 0 };

  const isSnapped = (posX, posY, snapX, snapY, tolerance = 5) =>
    Math.abs(posX - snapX) <= tolerance && Math.abs(posY - snapY) <= tolerance;

  const startGhostDrag = (type, imageSrc) => (e) => {
    e.preventDefault();
    const offset = { x: 50, y: 50 };
    setGhostShape({
      id: "ghost",
      type,
      imageSrc,
      position: {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      },
    });

    const handleMouseMove = (moveEvent) => {
      setGhostShape((prev) =>
        prev
          ? {
              ...prev,
              position: {
                x: moveEvent.clientX - offset.x,
                y: moveEvent.clientY - offset.y,
              },
            }
          : null
      );
    };

    const handleMouseUp = (upEvent) => {
      const wrapperBounds = canvasRef.current.getBoundingClientRect();
      const insideWrapper =
        upEvent.clientX >= wrapperBounds.left &&
        upEvent.clientX <= wrapperBounds.right &&
        upEvent.clientY >= wrapperBounds.top &&
        upEvent.clientY <= wrapperBounds.bottom;

      if (insideWrapper) {
        const canvasX = upEvent.clientX - wrapperBounds.left - offset.x;
        const canvasY = upEvent.clientY - wrapperBounds.top - offset.y;
        const id = Date.now();

        setDroppedShapes((prev) => [
          ...prev,
          {
            id,
            type,
            imageSrc,
            position: {
              x: Math.max(0, Math.min(canvasX, wrapperBounds.width - SHAPE_CONFIG.size)),
              y: Math.max(0, Math.min(canvasY, wrapperBounds.height - SHAPE_CONFIG.size)),
            },
            rotation: 0,
            animate: false,
            isSelected: false,
          },
        ]);
      }

      setGhostShape(null);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const getAngle = (center, x, y) => Math.atan2(y - center.y, x - center.x) * (180 / Math.PI);

  const normalizeAngle = (angle) => {
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle;
  };

  const checkShapeFit = (shape, ctx) => {
    const shapeCenterX = shape.position.x + SHAPE_CONFIG.size / 2;
    const shapeCenterY = shape.position.y + SHAPE_CONFIG.size / 2;
    const typeToPath = {
      parallelogram: getParallelogramPath,
      triangle: getTrianglePath,
      hexagon: getHexagonPath,
    };
    const targetPath = typeToPath[shape.type]?.(40);

    const angle = normalizeAngle(shape.rotation);
    const fitsRotation =
      angle <= SHAPE_CONFIG.rotationTolerance ||
      angle >= 360 - SHAPE_CONFIG.rotationTolerance;

    ctx.save();
    ctx.translate(shapeCenterX, shapeCenterY);
    ctx.rotate((shape.rotation * Math.PI) / 180);
    ctx.translate(-shapeCenterX, -shapeCenterY);
    const fitsPath = ctx.isPointInPath(targetPath, shapeCenterX, shapeCenterY);
    ctx.restore();

    return { fits: fitsPath && fitsRotation };
  };

  const isColliding = (newX, newY, shapeId) => {
    const size = SHAPE_CONFIG.size;
    return droppedShapes.some((shape) => {
      if (shape.id === shapeId) return false;
      const snapPos = getSnapPosition(shape.type);
      if (isSnapped(shape.position.x, shape.position.y, snapPos.x, snapPos.y)) return false;
      return (
        newX < shape.position.x + size &&
        newX + size > shape.position.x &&
        newY < shape.position.y + size &&
        newY + size > shape.position.y
      );
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragDataRef.current.isDragging) return;
    const { shapeId, offset } = dragDataRef.current;
    const currentShape = droppedShapes.find((s) => s.id === shapeId);
    if (!currentShape) return;

    // Check if this shape is currently paused due to collision
    if (collisionPauseRef.current[shapeId]) {
      return; // Skip all movement during pause
    }

    const canvasBounds = canvasRef.current.getBoundingClientRect();
    const wrapperWidth = canvasRef.current.offsetWidth;
    const wrapperHeight = canvasRef.current.offsetHeight;
    const size = SHAPE_CONFIG.size;

    let toX = e.clientX - canvasBounds.left - offset.x;
    let toY = e.clientY - canvasBounds.top - offset.y;

    // Constrain within canvas bounds
    toX = Math.max(0, Math.min(toX, wrapperWidth - size));
    toY = Math.max(0, Math.min(toY, wrapperHeight - size));

    // Check collision
    if (isColliding(toX, toY, shapeId)) {
      // Set collision pause for 2 seconds
      collisionPauseRef.current[shapeId] = true;
      
      setTimeout(() => {
        collisionPauseRef.current[shapeId] = false;
      }, 2000);
      
      return; // Don't update position during collision
    }

    // Store visual position for immediate DOM update
    visualPositionRef.current[shapeId] = { x: toX, y: toY };

    // Update state position
    setDroppedShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === shapeId ? { ...shape, position: { x: toX, y: toY } } : shape
      )
    );
  }, [droppedShapes]);

  const handleMouseUp = useCallback(() => {
    if (!dragDataRef.current.isDragging) return;
    const { shapeId } = dragDataRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.querySelector("canvas").getContext("2d");

    setDroppedShapes((prevShapes) =>
      prevShapes.map((shape) => {
        if (shape.id !== shapeId) return shape;
        const { fits } = checkShapeFit(shape, ctx);

        if (fits) {
          const snapPos = getSnapPosition(shape.type);
          return {
            ...shape,
            animate: true,
            rotation: 0,
            position: snapPos,
          };
        }
        return shape;
      })
    );

    // Clean up references for this shape
    delete visualPositionRef.current[shapeId];
    delete collisionPauseRef.current[shapeId];
    
    dragDataRef.current = { isDragging: false, shapeId: null, offset: { x: 0, y: 0 } };
    setDraggingShapeId(null);
  }, [checkShapeFit]);

  const handleRotateMove = useCallback((currentX, currentY) => {
    if (!rotationDataRef.current.isRotating) return;
    const { shapeId, center, startAngle, initialRotation } = rotationDataRef.current;
    const currentAngle = getAngle(center, currentX, currentY);
    const angleDiff = currentAngle - startAngle;
    const newRotation = initialRotation + angleDiff;
    setDroppedShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === shapeId ? { ...shape, rotation: newRotation } : shape
      )
    );
  }, []);

  const handleRotationMouseMove = useCallback((e) => {
    if (!rotationDataRef.current.isRotating) return;
    handleRotateMove(e.clientX, e.clientY);
  }, [handleRotateMove]);

  const handleRotationMouseUp = useCallback(() => {
    if (!rotationDataRef.current.isRotating) return;
    handleRotateEnd();
  }, []);

  const handleRotateEnd = useCallback(() => {
    window.removeEventListener("mousemove", handleRotationMouseMove);
    window.removeEventListener("mouseup", handleRotationMouseUp);
    rotationDataRef.current = {
      isRotating: false,
      shapeId: null,
      center: { x: 0, y: 0 },
      startAngle: 0,
      initialRotation: 0,
    };
  }, [handleRotationMouseMove, handleRotationMouseUp]);

  const handleRotateStart = (shapeId) => (center, startX, startY) => {
    const shape = droppedShapes.find((s) => s.id === shapeId);
    if (!shape) return;
    const startAngle = getAngle(center, startX, startY);
    rotationDataRef.current = {
      isRotating: true,
      shapeId,
      center,
      startAngle,
      initialRotation: shape.rotation,
    };
    window.addEventListener("mousemove", handleRotationMouseMove);
    window.addEventListener("mouseup", handleRotationMouseUp);
  };

  useEffect(() => {
    if (draggingShapeId !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggingShapeId, handleMouseMove, handleMouseUp]);

  const handleShapeMouseDown = (shapeId) => (e) => {
    const shape = droppedShapes.find((s) => s.id === shapeId);
    if (!shape) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    
    // Initialize visual position and clear any existing collision pause
    visualPositionRef.current[shapeId] = { ...shape.position };
    collisionPauseRef.current[shapeId] = false;
    
    dragDataRef.current = {
      isDragging: true,
      shapeId,
      offset: {
        x: e.clientX - bounds.left - shape.position.x,
        y: e.clientY - bounds.top - shape.position.y,
      },
    };
    setDraggingShapeId(shapeId);
  };

  const handleDoubleClick = (shapeId) => () => {
    requestAnimationFrame(() => {
      setSelectedShapeId((prev) => (prev === shapeId ? null : shapeId));
    });
  };

  useEffect(() => {
    const updatedTypes = droppedShapes.reduce((acc, shape) => {
      const snap = getSnapPosition(shape.type);
      if (isSnapped(shape.position.x, shape.position.y, snap.x, snap.y)) {
        acc.push(shape.type);
      }
      return acc;
    }, []);
    setPlacedShapeTypes([...new Set(updatedTypes)]);
  }, [droppedShapes]);

  return (
    <div
      className="container"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "22%",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          top: "30%",
          zIndex: 10,
        }}
      >
        <PaletteShape
          type="parallelogram"
          imageSrc="/pb_s5/parallelogram.svg"
          onMouseDown={startGhostDrag("parallelogram", "/pb_s5/parallelogram.svg")}
        />
        <PaletteShape
          type="triangle"
          imageSrc="/pb_s5/triangle-_active.svg"
          onMouseDown={startGhostDrag("triangle", "/pb_s5/triangle-_active.svg")}
        />
        <PaletteShape
          type="hexagon"
          imageSrc="/pb_s5/hexagon_active.svg"
          onMouseDown={startGhostDrag("hexagon", "/pb_s5/hexagon_active.svg")}
        />

      </div>

      <div
        className="canvas-wrapper"
        ref={canvasRef}
        style={{
          width: "600px",
          height: "400px",
          position: "relative",
          border: "2px dashed #999",
          overflow: "hidden",
        }}
      >
        <Canvas droppedShapes={droppedShapes} />

        {droppedShapes.map((shape) => {
          const isDragging = draggingShapeId === shape.id;
          const displayPosition = isDragging && visualPositionRef.current[shape.id] 
            ? visualPositionRef.current[shape.id] 
            : shape.position;
            
          return (
            <DraggableShape
            key={shape.id}
            type={shape.type}
            position={displayPosition}
            onMouseDown={handleShapeMouseDown(shape.id)}
            onDoubleClick={handleDoubleClick(shape.id)}
            imageSrc={shape.imageSrc}
            rotation={shape.rotation}
            animate={shape.animate}
            isSelected={selectedShapeId === shape.id}
            isDragging={isDragging}
            onRotateStart={handleRotateStart(shape.id)}
            onRotateMove={handleRotateMove}
            onRotateEnd={handleRotateEnd}
            onDelete={() => {
              setDroppedShapes((prev) => prev.filter((s) => s.id !== shape.id));
              delete visualPositionRef.current[shape.id];
              delete collisionPauseRef.current[shape.id];
              if (draggingShapeId === shape.id) setDraggingShapeId(null);
              if (selectedShapeId === shape.id) setSelectedShapeId(null);
            }}
            />

          );
        })}
      </div>

      {/* Ghost Shape */}
      {ghostShape && (
        <img
          src={ghostShape.imageSrc}
          alt={ghostShape.type}
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: ghostShape.position.x,
            top: ghostShape.position.y,
            width: SHAPE_CONFIG.size,
            height: SHAPE_CONFIG.size,
            opacity: 0.8,
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
}
/////////////////////////////////////////////////////////working canvas///////////////////////////////////////////////////
import React, { forwardRef, useEffect, useRef } from "react";
import {
  getParallelogramPath,
  getTrianglePath,
  getHexagonPath,
} from "../Utils";
import "../App.css"

const getSnapOffsets = {
  parallelogram: { x: 85, y: 90 },
  triangle: { x: 97, y: 6 },
  hexagon: { x: 250, y: 150 },
};

const getFillColor = (type) => {
  switch (type) {
    case "parallelogram":
      return "#b36232";
    case "triangle":
      return "#346819";
    case "hexagon":
      return "#2a75a3";
    default:
      return "gray";
  }
};

const Canvas = forwardRef(({ droppedShapes = [] }, ref) => {
  const innerRef = useRef(null);
  const canvasRef = ref || innerRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const offsetY = 40;

    const shapesMeta = [
      {
        type: "parallelogram",
        path: getParallelogramPath(offsetY),
      },
      {
        type: "triangle",
        path: getTrianglePath(offsetY),
      },
      {
        type: "hexagon",
        path: getHexagonPath(40),
      },
    ];

    for (const { type, path } of shapesMeta) {
      const snap = getSnapOffsets[type];
      const isSnapped = droppedShapes.some(
        (shape) =>
          shape.type === type &&
          shape.rotation === 0 &&
          Math.abs(shape.position.x - snap.x) < 2 &&
          Math.abs(shape.position.y - snap.y) < 2
      );

      ctx.fillStyle = isSnapped ? getFillColor(type) : "rgba(0,0,0,0)";
      ctx.strokeStyle = isSnapped ? getFillColor(type) : "gray";
      ctx.setLineDash(isSnapped ? [] : [5, 5]);
      ctx.lineWidth = 2;

      ctx.fill(path);
      ctx.stroke(path);
    }
  }, [droppedShapes]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="canvas"
      // style={{ background: "#fff"  , left:'20PX'}}
    />
  );
});

export default Canvas;
