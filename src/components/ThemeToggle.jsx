import { useTheme } from "../context/themeProvider";

function ThemeToggle() {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <div className="theme-toggle">
      {darkMode ? (
        <i className="fa-solid fa-sun fa-2xl" onClick={toggleTheme}></i>
      ) : (
        <i className="fa-solid fa-moon fa-2xl" onClick={toggleTheme}></i>
      )}
    </div>
  );
}

export default ThemeToggle;
