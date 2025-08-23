import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userStatus } from "../../slices/teacherSlice";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    
    try {
      
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/logoutTeacher`,
        {},
        { withCredentials: true }
      );
      
      alert("User Logged Out Successfully !!");
      dispatch(userStatus(false));
      navigate("/teacher/loginTeacher");
    } catch (error) {
      console.error("Error in logging out");
    }
  };

  return (
    <header className="bg-white shadow-md py-4 w-full">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center ">
          <Link to={isLoggedIn ? "/teacher" : "/"}>
            <img src="/logo.jpeg" alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-8">
            <li>
              <Link
                to={isLoggedIn ? "/teacher" : "/"}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer"
                
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="/#features"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/#testimonials"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="/#pricing"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
          {!isLoggedIn ? (
            <div className="ml-8 flex space-x-4">
              <Link
                to="/teacher/loginTeacher"
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
          ) : (
            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              onClick={logoutUser}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
