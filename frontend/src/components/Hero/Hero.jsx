import React from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-700 min-h-screen">

      {/* Hero Section */}
      <section id="home" className="flex-1 flex items-center justify-center text-white py-20">
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl font-extrabold mb-6">Assessment Made Simple!</h2>
          <p className="text-lg mb-8">
            An AI-powered real-time test assessment platform that lets teachers instantly create quizzes, share test links with students, and track performance — all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-red-600" onClick={()=>{navigate("/teacher/registerTeacher")}}>
              Get Started
            </button>
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-200" onClick={()=>{alert("Tutorial Video will be uploaded soon !")}}>
              Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="features" className="py-12">
        <div className="flex items-center justify-center gap-x-6">
          <Card1 />
          <Card2 />
          <Card3 />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              name: "Ananya",
              role: "High School Teacher",
              image: "https://randomuser.me/api/portraits/women/1.jpg",
              quote: "TestSphere has revolutionized how I conduct assessments. It's incredibly user-friendly!"
            },
            {
              name: "Rahul Kumar",
              role: "University Professor",
              image: "https://randomuser.me/api/portraits/men/1.jpg",
              quote: "The automated grading saves me hours of work. Highly recommended!"
            },
            {
              name: "Radhika Malhotra",
              role: "Online Tutor",
              image: "https://randomuser.me/api/portraits/women/2.jpg",
              quote: "The analytics help me understand where my students need more support."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4"/>
              <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Pay Per Test</h3>
              <div className="text-5xl font-bold mb-4">₹100<span className="text-xl text-gray-500">/test</span></div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Unlimited questions per test
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Detailed analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  24/7 support
                </li>
              </ul>
              <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-700" onClick={()=>{navigate("/teacher/registerTeacher")}} >
                Start Creating Tests
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
