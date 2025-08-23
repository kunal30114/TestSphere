import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherResponses = () => {
  const [tests, setTests] = useState([]);
  const [quizNames, setQuizNames] = useState({});
  const [selectedTest, setSelectedTest] = useState("");
  const [responses, setResponses] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [loadingResponses, setLoadingResponses] = useState(false);

  // Fetch all tests on mount
  useEffect(() => {
    const fetchTests = async () => {
      setLoadingTests(true);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/teacher/getTest`,
          {},
          { withCredentials: true }
        );
        setTests(data.data);

        // Fetch names for each test
        const names = {};
        await Promise.all(
          data.data.map(async (id) => {
            try {
              const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/teacher/getQuizName`,
                { testId: id },
                { withCredentials: true }
              );
              names[id] = res.data.data.title || `Quiz ${id.slice(0, 6)}`;
            } catch (err) {
              names[id] = `Quiz ${id.slice(0, 6)}`;
            }
          })
        );
        setQuizNames(names);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
      setLoadingTests(false);
    };

    fetchTests();
  }, []);

  // Fetch responses for a selected test
  const fetchResponses = async () => {
    if (!selectedTest) return;
    setLoadingResponses(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/getResponses`,
        { testId: selectedTest },
        { withCredentials: true }
      );
      setResponses(data.data);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
    setLoadingResponses(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Teacher Test Responses
        </h1>

        {/* Dropdown for selecting test */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <select
            className="w-full sm:w-2/3 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
          >
            <option value="">-- Select a Test --</option>
            {loadingTests ? (
              <option>Loading tests...</option>
            ) : (
              tests.map((id) => (
                <option key={id} value={id}>
                  {quizNames[id] || `Quiz ${id.slice(0, 6)}`}
                </option>
              ))
            )}
          </select>

          <button
            onClick={fetchResponses}
            disabled={!selectedTest || loadingResponses}
            className={`px-6 py-2 rounded-xl font-semibold transition-all ${
              selectedTest
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-700"
            }`}
          >
            {loadingResponses ? "Fetching..." : "Fetch Responses"}
          </button>
        </div>

        {/* Responses Table */}
        {responses.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md">
            <table className="min-w-full table-auto text-center">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Time Taken (sec)</th>
                  <th className="py-3 px-4">Submitted On</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {responses.map((res, index) => (
                  <tr
                    key={res._id}
                    className="hover:bg-purple-50 transition-colors"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{res.studentName}</td>
                    <td className="py-3 px-4">{res.studentEmail}</td>
                    <td className="py-3 px-4 text-purple-700 font-semibold">
                      {res.score}
                    </td>
                    <td className="py-3 px-4">
                      {(res.timeTaken / 1000).toFixed(1)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(res.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-6">
            {loadingResponses
              ? "Fetching responses..."
              : "No responses to display."}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeacherResponses;
