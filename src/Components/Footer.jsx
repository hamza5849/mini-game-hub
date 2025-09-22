import React from "react";

function Footer({ theme }) {
  return (
    <footer className={`text-center p-2 ${theme === "dark" ? "bg-dark text-white" : "bg-success text-dark"}`}>
      <small>© 2025 Mini Game Hub. All rights reserved.</small>
    </footer>
  );
}

export default Footer;
