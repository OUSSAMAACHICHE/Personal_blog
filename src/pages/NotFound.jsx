export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold underline bg-red-800 p-4 rounded-lg">
                404 - Page Not Found
            </h1>
            <p className="mt-4 text-lg text-gray-700">
                The page you are looking for does not exist.
            </p>
        </div>
    );
}