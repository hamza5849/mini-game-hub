import React from "react";

function Header({ theme, toggleTheme }) {
  return (
    <header className={`d-flex justify-content-between align-items-center p-2 ${theme === "dark" ? "bg-dark text-white" : "bg-success text-dark"}`}>
      <h5 className="mb-0">Mini Game Hub</h5>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="themeSwitch"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <label className="form-check-label" htmlFor="themeSwitch">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </label>
      </div>
    </header>
  );
}

export default Header;
