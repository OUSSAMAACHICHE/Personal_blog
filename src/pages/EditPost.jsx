import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Context for Snackbar
import { useSnackbar } from "../contexts/SnackbarContext";


export default function EditPost() {
  const [posts, setPosts] = useState([]);
  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  // State to manage Snackbar visibility
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();
  // Using useParams to get the postId from the URL
  const { postId } = useParams();

  // Fetching posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
    const postToEdit = savedPosts.find((p) => p.id === parseInt(postId));
    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        category: postToEdit.category,
        content: postToEdit.content,
      });
    }
  }, [postId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      id: parseInt(postId),
      ...formData,
      Date: new Date().toDateString(),
    };
    const updatedPosts = posts.map((post) =>
      post.id === parseInt(postId) ? updatedPost : post
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setFormData({
      title: "",
      category: "",
      content: "",
    });

    showSnackbar("Post updated successfully!", "success");
    navigate(`/postdetails/${postId}`); // Redirect to PostDetails page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Edit Post</h2>
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
            name="title"
            type="text"
            placeholder="Enter title"
            className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            value={formData.category}
            onChange={handleChange}
            name="category"
            type="text"
            placeholder="Enter category"
            className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
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
            name="content"
            placeholder="Enter content"
            className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Post
          </button>
          <Link to={`/postdetails/${postId}`}>
            <button
              type="button"
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
