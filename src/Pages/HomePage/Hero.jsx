import { useState } from "react";
import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";
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
    <section className="relative overflow-hidden bg-gray-50">
      {/* Decorative tilted rectangle outlines — top right */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-6 right-[30%] w-48 h-48 border border-indigo-200 opacity-50"
          style={{ transform: "rotate(14deg)" }}
        />
        <div
          className="absolute top-16 right-[20%] w-72 h-64 border border-indigo-200 opacity-30"
          style={{ transform: "rotate(14deg)" }}
        />
        <div
          className="absolute top-28 right-[10%] w-96 h-80 border border-indigo-200 opacity-20"
          style={{ transform: "rotate(14deg)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center">
        {/* ── Left ── */}
        <div className="flex-1 py-16 md:py-24">
          {/* Heading */}
          <h1 className="text-5xl md:text-[3.5rem] font-extrabold text-gray-900 leading-tight tracking-tight">
            Discover <br /> more than
          </h1>
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-[3.5rem] font-extrabold text-blue-600 leading-tight tracking-tight">
              5000+ Jobs
            </h1>
            {/* Wavy underline arrow — matches Figma */}
            <svg
              viewBox="0 0 310 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-3 left-0 w-full"
            >
              <path
                d="M4 12 C60 3, 120 17, 180 10 C230 4, 270 14, 298 8"
                stroke="#60a5fa"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M295 6 L308 10 L298 14"
                stroke="#60a5fa"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <p className="mt-8 text-gray-500 text-[15px] max-w-sm leading-relaxed">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* ── Search Bar ── */}
          <div className="mt-8 flex items-stretch bg-white shadow-lg rounded-xl border border-gray-100 max-w-[520px] overflow-hidden">
            {/* Keyword input */}
            <div className="flex items-center gap-2 flex-1 px-4">
              <FiSearch className="text-gray-400 shrink-0 w-4 h-4" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent py-4"
              />
            </div>

            {/* Vertical divider */}
            <div className="w-px bg-gray-150 self-stretch my-3" />

            {/* Location input */}
            <div className="flex items-center gap-1.5 px-4 w-48 shrink-0">
              <FiMapPin className="text-gray-400 shrink-0 w-4 h-4" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full outline-none text-sm text-gray-700 bg-transparent py-4"
              />
              <FiChevronDown className="text-gray-400 shrink-0 w-4 h-4" />
            </div>

            {/* Button flush to edge */}
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-4 transition-colors shrink-0 rounded-r-xl"
            >
              Search my job
            </button>
          </div>

          {/* Popular tags */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            <span className="font-medium text-gray-600">Popular :</span>
            {popularTags.map((tag, i) => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?keyword=${tag}`)}
                className="hover:text-blue-600 transition-colors"
              >
                {tag}{i < popularTags.length - 1 && ","}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Hero Image sits at bottom ── */}
        <div className="hidden md:flex flex-1 justify-end items-end self-end">
          <img
            src={heroImg}
            alt="Job Seeker"
            className="w-[400px] xl:w-[460px] object-contain object-bottom select-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
