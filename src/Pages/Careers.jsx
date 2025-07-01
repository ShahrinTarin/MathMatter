import React from 'react';
import { FaChartLine, FaCalculator, FaUniversity, FaChalkboardTeacher, FaRegChartBar, FaCode } from 'react-icons/fa';

const Careers = () => {
  const careers = [
    {
      title: 'Data Scientist',
      description:
        'Use math, stats, and coding to analyze data and help companies make informed decisions.',
      icon: <FaChartLine className="text-3xl text-[#1b9c85] group-hover:scale-110 transition" />,
    },
    {
      title: 'Actuary',
      description:
        'Analyze financial risk using mathematics and statistics to forecast future events.',
      icon: <FaCalculator className="text-3xl text-[#1b9c85] group-hover:scale-110 transition" />,
    },
    {
      title: 'Quantitative Analyst',
      description:
        'Apply advanced math models to financial markets, pricing, and risk management.',
      icon: <FaRegChartBar className="text-3xl text-[#1b9c85] group-hover:scale-110 transition" />,
    },
    {
      title: 'Operations Research Analyst',
      description:
        'Use mathematical modeling and optimization to help organizations solve complex problems.',
      icon: <FaCode className="text-3xl text-[#1b9c85] group-hover:scale-110 transition" />,
    },
    {
      title: 'Math Teacher / Professor',
      description:
        'Teach math at schools or universities — inspiring future mathematicians and thinkers.',
      icon: <FaChalkboardTeacher className="text-3xl text-[#1b9c85] group-hover:scale-110 transition" />,
    },
    {
      title: 'Statistician',
      description:
        'Collect and analyze data to tackle real-world challenges in various industries.',
      icon: <FaUniversity className="text-3xl text-[#1b9c85] group-hover:scale-110 transition" />,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] w-11/12 max-w-7xl mx-auto pt-5 pb-16 ">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">
        Careers in <span className="text-[#1b9c85]">Mathematics</span>
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover rewarding paths you can pursue with a strong foundation in math.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {careers.map((career, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out group"
          >
            <div className="mb-4">{career.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#1b9c85] group-hover:text-[#167a6c] transition">
              {career.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {career.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
