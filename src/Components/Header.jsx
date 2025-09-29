// Header.jsx
// Top navigation with theme switcher
import React from "react";

function Header({ theme, toggleTheme }) {
  return (
    <header className={`header d-flex justify-content-between align-items-center px-3`}>
      <div className="d-flex align-items-center gap-3">
        <h5 className="mb-0">Mini Game Hub</h5>
        
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* accessible toggle using bootstrap switch */}
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            onChange={toggleTheme}
            checked={theme === "dark"}
            aria-label="Toggle theme"
          />
          <label className="form-check-label" htmlFor="themeSwitch" style={{ userSelect: "none" }}>
            {theme === "dark" ? "Dark" : "Light"}
          </label>
        </div>
      </div>
    </header>
  );
}

export default Header;
