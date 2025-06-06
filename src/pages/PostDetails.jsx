import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Context for Snackbar
import { useSnackbar } from "../contexts/SnackbarContext";
// material UI Icons
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
// Dailog material ul
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function PostDetails() {
  const [open, setOpen] = useState(false);
  // State to manage posts
  const [posts, setPosts] = useState([]);
  // Using useParams to get the postId from the URL
  const { postId } = useParams();
  const navigate = useNavigate();

  // Context for Snackbar
  const showSnackbar = useSnackbar();

  // Fetching posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
    console.log("localStorage posts:", savedPosts);
  }, []);

  const post = posts.find((p) => p.id === parseInt(postId));
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-10 flex flex-col items-center max-w-md w-full">
          <p className="text-red-500 text-xl font-semibold">Post not found!</p>
        </div>
      </div>
    );
  }

  const openDeleteDialog = () => {
    setOpen(true);
  };

  // Function to handle the confirmation of deletion
  const handleDeleteConfirm = () => {
    const updatedPosts = posts.filter((p) => p.id !== parseInt(postId));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    showSnackbar("Post deleted successfully!", "success");
    navigate("/postlist"); // Redirect to PostList page
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-2xl w-full">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
              Category: {post.category}
            </span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
              <AccessTimeFilledIcon className="!text-blue-600 dark:!text-blue-300" />{" "}
              {post.Date}
            </span>
          </div>
          <p className="text-lg text-gray-800 dark:text-gray-100 leading-relaxed">
            {post.content}
          </p>
          <div className="mt-6 flex items-center">
            <button
              onClick={() => navigate("/postlist")}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition"
            >
              Back to Posts
            </button>
            <button
              className="ml-4 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg font-semibold shadow hover:bg-red-700 dark:hover:bg-red-800 transition"
              onClick={openDeleteDialog}
            >
              Delete Post
            </button>
            <Link to={`/editpost/${postId}`}>
              <button className="bg-yellow-500 ml-4 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit Post
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dark:bg-gray-800 dark:text-gray-100"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:bg-gray-800 dark:text-gray-100"
        >
          {"Delete Post"}
        </DialogTitle>
        <DialogContent className="dark:bg-gray-800 dark:text-gray-100">
          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: document.documentElement.classList.contains("dark")
                ? "#d1d5db" // Tailwind gray-300 for dark mode
                : "rgba(0,0,0,0.6)", // default MUI color for light mode
            }}
          >
            {
              "Are you sure you want to delete this post? This action cannot be undone."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dark:bg-gray-800">
          <Button onClick={handleClose} className="dark:text-gray-100">
            Disagree
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            autoFocus
            className="dark:text-gray-100"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
