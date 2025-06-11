import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import PostList from "./pages/PostList";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";
import EditPost from "./pages/EditPost";

// material-ui icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Context
import { SnackbarProvider } from "./contexts/SnackbarContext";

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") return true;
    if (saved === "false") return false;
    if (saved === null) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    // fallback for any unexpected value
    return false;
  });

console.log(window.matchMedia("(prefers-color-scheme: dark)"));

  // Update <html> class and localStorage when dark changes
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  
  // Toggle dark mode
  const handleDarkModeToggle = () => setDark((prev) => !prev);

  return (
    <>
      <button
        className="fixed top-2 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded shadow"
        onClick={handleDarkModeToggle}
        title="Toggle Dark Mode"
        aria-pressed={dark}
      >
        {dark ? <LightModeIcon /> : <DarkModeIcon />}
      </button>
      <SnackbarProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/postdetails/:postId" element={<PostDetails />} />
          <Route path="/editpost/:postId" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </>
  );
}

export default App;
