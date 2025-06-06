import { Link } from 'react-router-dom';



export default function NavBar() {
    return (
        <nav >
            <ul className="flex space-x-4 bg-gray-800 p-4 text-white">
                <li>
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                </li>
                <li>
                    <Link to="/postlist" className="hover:text-gray-400">Post List</Link>
                </li>
                <li>
                    <Link to="/createpost" className="hover:text-gray-400">Create Post</Link>
                </li>
                
            </ul>
        </nav>
    );
}   