import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

export default function PostList() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setAllPosts(savedPosts);
    setPosts(savedPosts);
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === "All") {
      setPosts(allPosts);
    } else {
      setPosts(allPosts.filter((post) => post.category === category));
    }
  };

  const postsList = useMemo(() => posts.map((post) => (
    <div
      key={post.id}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mb-6 transition-transform hover:scale-105"
    >
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
        {post.title}
      </h2>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
          Category : {post.category}
        </span>
        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
          <AccessTimeFilledIcon className="!text-blue-600 dark:!text-blue-300" />{" "}
          {post.Date}
        </span>
      </div>
      <Link
        to={`/postdetails/${post.id}`}
        className="inline-block mt-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition"
      >
        Read more <ReadMoreIcon />
      </Link>
    </div>
  )), [posts]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center">
          All Posts
        </h1>
        <select
          name="category"
          id="category"
          className="mb-6 p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option disabled>Filter by Category</option>
          <option value="All">All</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
          <option value="Travel">Travel</option>
          <option value="Sports">Sports</option>
        </select>
        {postsList.length > 0 ? (
          postsList
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center">
            No posts available.
          </p>
        )}
      </div>
      {/* Go to home page */}
      <Link
        to="/"
        className="fixed bottom-4 right-4 bg-blue-600 dark:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
        aria-label="Back to Home"
      >
        <span className="sr-only">Back to Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m4 0h1v4h1m-5 0a2 2 0 11-4 0 2 2 0 014 0zm8-6a2 2 0 11-4 0 2 2 0 014 0zM5.5 9.5a2.5 2.5 0 11-5 0A2.5 2.5 0 015.5 9.5zM19.5 9.5a2.5 2.5 0 11-5 0A2.5 2.5 0 0119.5 9.5z"
          />
        </svg>
      </Link>
    </div>
  );
}
