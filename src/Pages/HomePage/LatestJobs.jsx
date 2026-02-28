import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jobs?limit=8&sort=newest`
        );
        setJobs(res.data.jobs || res.data);
      } catch (err) {
        console.error("Failed to fetch latest jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="px-6 md:px-16 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Latest{" "}
            <span className="text-blue-500 font-extrabold">jobs open</span>
          </h2>
          <Link
            to="/jobs"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Show all jobs
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white animate-pulse rounded-xl h-28 border border-gray-100"
              />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <LatestJobCard key={job._id} job={job} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default LatestJobs;
