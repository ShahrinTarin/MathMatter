import React from 'react';
import { Link } from 'react-router';

const ExtraSection = () => {
 const learnTopics = [
    {
      title: 'Problem Solving',
      desc: 'Sharpen your logic and tackle complex math problems with confidence.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#1b9c85]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Puzzle piece */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 14v1m8-8h-1M5 12H4m14.071-4.071l-.707.707M6.636 17.364l-.707.707M17.364 17.364l.707.707M6.636 6.636l.707.707M12 8a4 4 0 110 8 4 4 0 010-8z" />
        </svg>
      ),
    },
    {
      title: 'Concept Clarity',
      desc: 'Understand tough concepts through clear explanations and examples.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#1b9c85]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Lightbulb */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a7 7 0 00-7 7c0 2.5 1.5 4.5 3.5 5.5v2a2 2 0 002 2h3a2 2 0 002-2v-2c2-1 3.5-3 3.5-5.5a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'Real-Life Applications',
      desc: 'See how math connects to real-world scenarios and careers.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#1b9c85]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Chart bar */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6m6 13V9m6 10V3M3 21h18" />
        </svg>
      ),
    },
    {
      title: 'Practice & Revision',
      desc: 'Access quizzes and exercises to practice and test your knowledge.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#1b9c85]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Check circle */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      ),
    },
    {
      title: 'Curiosity & Growth',
      desc: 'Stay curious and keep learning beyond the classroom.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#1b9c85]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Sparkle / Growth */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3L3 5m0 0l2 2m-2-2h4m5 10a5 5 0 100-10 5 5 0 000 10zm0 0v4m0 0l2 2m-2-2l-2 2m5-5h4m0 0l2 2m-2-2l2-2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-20 mb-40 py-16 px-4 bg-white rounded-2xl shadow-lg text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        What You'll Learn Here
      </h1>
      <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
        This site is designed to help you build strong math skills and a deeper love for learning.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {learnTopics.map((item) => (
          <div
            key={item.title}
            className="bg-[#EDF6EE] hover:bg-[#d6f0db] transition rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md"
          >
            <div className="flex justify-center items-center mb-4">
              {item.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <Link
        to="/allblogs"
        className="mt-12 inline-block px-8 py-3 font-medium rounded-full text-white bg-gradient-to-r from-[#1b9c85] to-green-500 shadow hover:shadow-lg transform hover:-translate-y-1 transition"
      >
        Start Exploring
      </Link>
    </section>
    );
};

export default ExtraSection;