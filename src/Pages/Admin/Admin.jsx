import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { FiTrash2, FiPlus, FiX } from "react-icons/fi";

const categories = ["Design", "Sales", "Marketing", "Finance", "Technology", "Engineering", "Business", "Human Resource"];

const defaultForm = {
  title: "", company: "", location: "", type: "Full Time",
  category: "Design", description: "",
};

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);
      setJobs(res.data.jobs || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Required";
    if (!form.company.trim()) errs.company = "Required";
    if (!form.location.trim()) errs.location = "Required";
    if (!form.description.trim()) errs.description = "Required";
    return errs;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/jobs`, form);
      setForm(defaultForm);
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">Manage job listings</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <FiPlus className="w-4 h-4" /> Post a Job
          </button>
        </div>

        {/* Job Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading...</div>
          ) : jobs.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No jobs posted yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Job Title</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 hidden md:table-cell">Company</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 hidden md:table-cell">Location</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 hidden sm:table-cell">Category</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{job.title}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{job.company}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{job.location}</td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {job.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Post Job Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Post a New Job</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {[
                { id: "title", label: "Job Title", type: "text", placeholder: "e.g. Product Designer" },
                { id: "company", label: "Company", type: "text", placeholder: "e.g. Dropbox" },
                { id: "location", label: "Location", type: "text", placeholder: "e.g. San Francisco, USA" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[id]}
                    onChange={(e) => { setForm({ ...form, [id]: e.target.value }); setErrors({ ...errors, [id]: "" }); }}
                    className={`w-full border rounded-xl text-sm px-4 py-2.5 outline-none focus:border-blue-500 transition-colors ${errors[id] ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl text-sm px-4 py-2.5 outline-none focus:border-blue-500"
                  >
                    {["Full Time", "Part Time", "Remote", "Contract"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl text-sm px-4 py-2.5 outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  placeholder="Describe the role and requirements..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: "" }); }}
                  className={`w-full border rounded-xl text-sm px-4 py-2.5 outline-none focus:border-blue-500 resize-none transition-colors ${errors.description ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  {submitting ? "Posting..." : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
