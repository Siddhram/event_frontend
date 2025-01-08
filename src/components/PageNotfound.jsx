import React from 'react'
import { Link } from 'react-router-dom'

const PageNotfound = () => {
  return (
    <div>
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 text-center p-6">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <p className="text-xl my-4">Oops! The page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-6 inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-lg text-lg transition duration-300"
      >
        Go Back Home
      </Link>
      <img 
        src="https://via.placeholder.com/400x200?text=404+Page+Not+Found" 
        alt="404 illustration" 
        className="mt-8 rounded-lg shadow-xl max-w-xs"
      />
    </div>
    </div>
  )
}

export default PageNotfound