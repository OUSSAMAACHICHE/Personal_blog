import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      <button
        className="fixed top-2 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded shadow"
        onClick={() => setDark((d) => !d)}
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
// This is a simple React component that renders a heading with Tailwind CSS styles.
