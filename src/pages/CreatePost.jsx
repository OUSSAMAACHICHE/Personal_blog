import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// use context for Snackbar
import { useSnackbar } from "../contexts/SnackbarContext";

// Material UI Icons
import CreateIcon from '@mui/icons-material/Create';


export default function CreatePost() {
  // State to hold posts and form data
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  // Snackbar context to show messages
  const showSnackbar = useSnackbar();

  const navigate = useNavigate();
  // Load posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      ...formData,
      Date: new Date().toDateString(),
    };
    const updatedPosts = [...posts, newPost];

    // Sort posts by date in descending order
    updatedPosts.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    // Update state and localStorage
    setPosts(updatedPosts);
    setFormData({
      title: "",
      category: "",
      content: "",
    });
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    

    showSnackbar("Post created successfully!", "success");
    navigate("/postlist"); // Redirect to PostList page
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <form
          className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            Create a New Post
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              type="text"
              id="title"
              name="title"
              placeholder="Enter post title"
              className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <select name="category" id="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required >
              <option value="" disabled>Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={handleChange}
              id="content"
              name="content"
              rows="4"
              placeholder="Write your post content here..."
              className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Post <CreateIcon />
            </button>
          </div>
        </form>
      </div>
      
    </>
  );
}
