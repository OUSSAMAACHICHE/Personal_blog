import { Link } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-10 flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 text-center">
          Welcome to <span className="text-blue-600 dark:text-blue-400">My Blog</span>!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
          Discover, create, and share amazing posts with the community.
        </p>
        <Link
          to="/postlist"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 transition"
          aria-label="View All Posts"
        >
          <ListIcon />
          View All Posts
        </Link>
      </div>
    </main>
  );
}
