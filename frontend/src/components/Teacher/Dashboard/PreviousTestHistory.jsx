import React, { useState } from 'react';

function PreviousTestHistory() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [testData, setTestData] = useState([]);
  const [topics] = useState(['React', 'JavaScript', 'Python', 'Java', 'HTML/CSS']);

  const fetchTestData = async () => {
    try {
      const response = await fetch(`/api/tests/${selectedTopic}`);
      const data = await response.json();
      setTestData(data);
    } catch (error) {
      console.error('Error fetching test data:', error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-500 min-h-screen">
      <div className="mb-6 flex gap-4">
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="p-2 rounded"
        >
          <option value="">Select Topic</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
        <button
          onClick={fetchTestData}
          className="bg-white px-4 py-2 rounded hover:bg-gray-100"
        >
          Fetch
        </button>
      </div>

      {testData.length > 0 && (
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Topic</th>
              <th className="p-3">Start Time</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((test, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{test.name}</td>
                <td className="p-3">{test.rollNo}</td>
                <td className="p-3">{test.topic}</td>
                <td className="p-3">{new Date(test.startTime).toLocaleString()}</td>
                <td className="p-3">{test.duration} mins</td>
                <td className="p-3">{test.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PreviousTestHistory;
