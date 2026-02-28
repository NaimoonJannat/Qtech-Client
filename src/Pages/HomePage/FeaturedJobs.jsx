import { useEffect, useState } from "react";
import { Link } from "react-router";
import JobCard from "./JobCard";
import axios from "axios";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs?featured=true&limit=8`);
        setJobs(res.data.jobs || res.data);
      } catch (err) {
        console.error("Failed to fetch featured jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured <span className="text-blue-600">jobs</span>
          </h2>
          <Link
            to="/jobs"
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            Show all jobs →
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-xl h-44" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No featured jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
