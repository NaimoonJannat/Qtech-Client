import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import JobCard from "../HomePage/JobCard";
import { FiSearch, FiMapPin, FiFilter } from "react-icons/fi";

const categories = [
  "All", "Design", "Sales", "Marketing", "Finance",
  "Technology", "Engineering", "Business", "Human Resource",
];

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = {};
        if (keyword) params.keyword = keyword;
        if (location) params.location = location;
        if (category && category !== "All") params.category = category;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`, { params });
        setJobs(res.data.jobs || res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [keyword, location, category]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white px-6 md:px-16 py-8 border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3">
            <FiSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title or keyword"
              defaultValue={keyword}
              onBlur={(e) => updateParam("keyword", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updateParam("keyword", e.target.value)}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 sm:w-56">
            <FiMapPin className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Location"
              defaultValue={location}
              onBlur={(e) => updateParam("location", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updateParam("location", e.target.value)}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="text-gray-400" />
              <h3 className="font-semibold text-gray-800 text-sm">Category</h3>
            </div>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => updateParam("category", cat === "All" ? "" : cat)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      category === cat || (cat === "All" && !category)
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Jobs list */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-44" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No jobs found.</p>
              <p className="text-gray-300 text-sm mt-2">Try different keywords or filters.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4">
                Showing <span className="font-semibold text-gray-700">{jobs.length}</span> results
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} variant="grid" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
