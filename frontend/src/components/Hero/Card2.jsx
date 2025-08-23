import React from "react";

function Card2() {
  return (
   <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img
      class="rounded-t-lg"
      src="../../Step2.png"
      alt="Technology image"
    />
  </a>
  <div class="p-5">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Share the Test Link
      </h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Once the test is generated, a unique URL is provided. Teachers can share this link with students, allowing them to register and attempt the test seamlessly.
    </p>
   
  </div>
</div>

  );
}

export default Card2;
