import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import heroImg from "../../assets/Pic.png"; 
import { useNavigate } from "react-router";

const popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"];

const Hero = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Florence, Italy");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/jobs?keyword=${keyword}&location=${location}`);
  };

  return (
    <section className="relative bg-white overflow-hidden px-6 md:px-16 py-12 md:py-20">
      {/* Background decorative circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-blue-100 opacity-50 pointer-events-none" />
      <div className="absolute top-10 right-40 w-64 h-64 rounded-full border border-blue-100 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Discover more than{" "}
            <span className="text-blue-600 border-b-4 border-blue-400">
              5000+ Jobs
            </span>
          </h1>
          <p className="mt-4 text-gray-500 text-base max-w-md leading-relaxed">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 bg-white shadow-lg rounded-xl p-2 border border-gray-100 max-w-xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <FiSearch className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 border-l border-gray-200">
              <FiMapPin className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors shrink-0"
            >
              Search my job
            </button>
          </div>

          {/* Popular tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="font-medium">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?keyword=${tag}`)}
                className="hover:text-blue-600 transition-colors"
              >
                {tag}
                {tag !== popularTags[popularTags.length - 1] && ","}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end z-10">
          <img
            src={heroImg}
            alt="Job Seeker"
            className="w-72 md:w-96 object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
