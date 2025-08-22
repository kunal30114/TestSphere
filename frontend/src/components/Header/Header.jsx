import React from 'react'
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header className="bg-white shadow-md py-4 w-full">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center ">
          <Link to="/">
            <img 
              src="/logo.jpeg" 
              alt="Logo" 
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/features" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                to="/testimonials" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="ml-8 flex space-x-4">
            <Link
              to="teacher/loginTeacher"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
            <Link
              to="/teacher/registerTeacher"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header