import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [teacherName, setTeacherName] = useState("");
  const [totalTests, setTotalTests] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/getUser`,
          {},
          { withCredentials: true }
        );
        setTeacherName(response.data.data.name);
        setTotalTests(response.data.data.myTest.length);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchData();
  }, [email]);

  const logoutUser = async ()=>{
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logoutTeacher`,
        {},
        {withCredentials:true});
      alert("User Logged Out Successfully !!");
      navigate("loginTeacher")
    } catch (error) {
        console.error("Error in logging out");
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-600 to-pink-500">
      {/* Sidebar */}
      <div className="w-64 bg-white bg-opacity-10 backdrop-blur-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-8">
            Welcome, {teacherName}!
          </h2>
          <nav>
            <Link
              to={`generateTest?email=${email}`}
              className="block py-3 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded-lg mb-2"
            >
              Generate Test
            </Link>
            <Link
              to={`view-results?email=${email}`}
              className="block py-3 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded-lg"
            >
              View Results
            </Link>
            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              onClick={logoutUser}
            >
              LogOut
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Total Tests
            </h3>
            <p className="text-3xl font-bold text-white">{totalTests}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
