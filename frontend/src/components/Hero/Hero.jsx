import React from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
function Hero() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-700 min-h-screen flex flex-col py-10">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center text-white py-20">
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl font-extrabold mb-6">
            Assessment Made Simple!
          </h2>
          <p className="text-lg mb-8">
            With Test Sphere , accessing students becomes simple and engaging.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-red-600">
              Get Started
            </button>
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-200">
              Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <div className="flex items-center justify-center gap-x-6">
        <Card1 />
        <Card2 />
        <Card1 />
      </div>
    </div>
  );
}

export default Hero;
