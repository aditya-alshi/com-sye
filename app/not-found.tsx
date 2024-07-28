export default function Page() {
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl mt-4">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          Go back to Home
        </a>
      </div>
    )
}