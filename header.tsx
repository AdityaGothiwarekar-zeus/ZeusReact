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
