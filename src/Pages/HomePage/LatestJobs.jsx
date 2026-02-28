import { useEffect, useState } from "react";
import { Link } from "react-router";
import JobCard from "./JobCard";
import axios from "axios";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs?limit=8&sort=newest`);
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Latest <span className="text-blue-600">jobs open</span>
          </h2>
          <Link
            to="/jobs"
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            Show all jobs →
          </Link>
        </div>

        {/* Two-column list */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-20" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <JobCard job={job} variant="list" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
