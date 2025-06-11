import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const POSTS_PER_PAGE = 5;

export default function PostList() {
  // State to manage posts and categories
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setAllPosts(savedPosts);
    setPosts(savedPosts);

    // Restore selected category if exists
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory && savedCategory !== "All") {
      setSelectedCategory(savedCategory);
      setPosts(savedPosts.filter((post) => post.category === savedCategory));
    }
  }, []);

  // Handle category filter
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on filter
    localStorage.setItem("selectedCategory", category);
    if (category === "All") {
      setPosts(allPosts);
    } else {
      setPosts(allPosts.filter((post) => post.category === category));
    }
  };

  // Handle search
  const handleSearch = useMemo(
    () => (event) => {
      const term = event.target.value;
      setSearchTerm(term);
      setCurrentPage(1); // Reset to first page on search
      if (term === "") {
        setPosts(allPosts);
      } else {
        const filteredPosts = allPosts.filter((post) =>
          post.title.toLowerCase().includes(term.toLowerCase())
        );
        setPosts(filteredPosts);
      }
    },
    [allPosts]
  );

  // Pagination logic
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  // Ensure currentPage is within bounds
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  // Posts list for current page
  const postsList = useMemo(
    () =>
      paginatedPosts.map((post) => (
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
      )),
    [paginatedPosts]
  );

  // Pagination controls
  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 my-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-50"
        aria-label="Previous Page"
        title="Previous Page"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded font-semibold ${
            currentPage === i + 1
              ? "bg-blue-600 dark:bg-blue-700 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-50"
        aria-label="Next Page"
        title="Next Page"
      >
        Next
      </button>
    </div>
  );

  useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages || 1);
  }
}, [totalPages, currentPage]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setPosts(allPosts);
    } else {
      setPosts(allPosts.filter((post) => post.category === selectedCategory));
    }
  }, [allPosts, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center">
          All Posts
        </h1>
        {/* Categories */}
        <select
          name="category"
          id="category"
          className="mb-6 p-2 border mr-0.5 border-gray-300 dark:border-gray-600 rounded-lg w-full max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
        {/* Search Posts */}
        <input
          type="text"
          placeholder="Search posts..."
          className="mb-6 p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          onChange={handleSearch}
        />
        {/* Posts List */}
        {postsList.length > 0 ? (
          <>
            {postsList}
            <Pagination />
          </>
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
