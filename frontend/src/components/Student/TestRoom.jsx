import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function TestRoom() {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId");
  const email = searchParams.get("email");
  const timeAtStart = Number(searchParams.get("timeAtStart")) || Date.now();
  const name = searchParams.get("name");

  const [parsedData, setParsedData] = useState({
    topic: "",
    difficulty: "",
    questions: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Corrected JSON extractor
  const extractJSON = (raw) => {
    if (!raw) return null;

    try {
      console.log("Hi1");
      
      // Step 1: If it's already an object, return it
      if (typeof raw === "object") return raw;

      // Step 2: Convert to string
      let cleaned = String(raw).trim();
      console.log("Hi2");
      // Step 3: Remove surrounding quotes if any
      // cleaned = cleaned.replace(/^"|"$/g, "");
      console.log("Hi3");
      // Step 4: Replace escaped quotes & newlines
      // cleaned = cleaned.replace(/\\"/g, '"').replace(/\\n/g, "");
      console.log("Hi4");
      console.log(cleaned);
      
      // Step 5: First parse  
      let first = JSON.parse(cleaned);
      console.log("Hi5");
      // Step 6: If it's still a string, parse again
      if (typeof first === "string") {
        first = JSON.parse(first);
      }

      return first;
    } catch (e) {
      console.error("extractJSON failed:", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          "http://localhost:8000/student/getTest",
          { id: testId },
          { withCredentials: true }
        );
        console.log(result);
        
        const rawData =
          result?.data?.data?.data ?? null;

        const parsed = extractJSON(rawData);

        if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          setParsedData(parsed);
        } else {
          setParsedData({
            topic: parsed?.topic || "",
            difficulty: parsed?.difficulty || "",
            questions: Array.isArray(parsed?.questions) ? parsed.questions : [],
          });
        }

        console.log("✅ Final Parsed Data:", parsed);
      } catch (error) {
        console.error("❌ Error while loading test:", error);
        setParsedData({ topic: "", difficulty: "", questions: [] });
      } finally {
        setLoading(false);
      }
    };

    if (testId) fetchTest();
    else setLoading(false);
  }, [testId]);

  const handleOptionSelect = (qIndex, option) => {
    setSelectedOptions((prev) => ({ ...prev, [qIndex]: option }));
  };

  const submitTest = async () => {
    if (!parsedData || !parsedData.questions.length) return;

    const timeAtEnd = Date.now();
    const totalScore = parsedData.questions.reduce(
      (acc, q, i) => (selectedOptions[i] === q.correct ? acc + 1 : acc),
      0
    );

    try {
      await axios.post(
        "http://localhost:8000/student/submitTest",
        {
          quiz: testId,
          studentName: name,
          studentEmail: email,
          timeTaken: timeAtEnd - timeAtStart,
          score: totalScore,
        },
        { withCredentials: true }
      );

      setScore(totalScore);
      setShowAnswers(true);
      alert("✅ Your test has been submitted successfully!");
    } catch (error) {
      console.error("❌ Error while submitting test:", error);
      alert("Re-Submitting the test not allowed !!");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading test...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-2xl mt-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Test Details</h1>

      {parsedData?.questions?.length > 0 ? (
        <div>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Topic: <span className="text-green-700">{parsedData.topic}</span>
            </h2>
            <h3 className="text-lg font-medium">
              Difficulty: <span className="text-red-500">{parsedData.difficulty}</span>
            </h3>
          </div>

          {parsedData.questions.map((q, index) => (
            <div
              key={index}
              className="bg-white p-5 mb-5 rounded-xl shadow-md border border-gray-200"
            >
              <h4 className="font-semibold text-lg mb-3">
                Q{index + 1}. {q.question}
              </h4>

              <div className="space-y-3">
                {(q.options || []).map((option, i) => (
                  <label
                    key={i}
                    className={`flex items-center p-3 rounded-lg cursor-pointer border transition duration-200 ${
                      selectedOptions[index] === option
                        ? "bg-blue-100 border-blue-400"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={option}
                      checked={selectedOptions[index] === option}
                      onChange={() => handleOptionSelect(index, option)}
                      className="mr-3 accent-blue-600"
                    />
                    {option}
                  </label>
                ))}
              </div>

              {showAnswers && (
                <p
                  className={`mt-3 font-medium ${
                    selectedOptions[index] === q.correct ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Correct Answer: <span className="font-semibold">{q.correct}</span>
                </p>
              )}
            </div>
          ))}

          {!showAnswers ? (
            <button
              onClick={submitTest}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
            >
              Submit Test
            </button>
          ) : (
            <div className="text-center mt-6">
              <p className="text-xl font-bold">
                Your Score: <span className="text-green-600">{score}</span> /{" "}
                {parsedData.questions.length}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No questions found.</p>
          <pre className="mt-3 text-left bg-white p-3 rounded">
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
