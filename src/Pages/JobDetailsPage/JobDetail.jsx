import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { FiMapPin, FiBriefcase, FiArrowLeft } from "react-icons/fi";

const tagColors = {
  Marketing: "bg-yellow-100 text-yellow-700",
  Design: "bg-blue-100 text-blue-700",
  Business: "bg-green-100 text-green-700",
  Technology: "bg-purple-100 text-purple-700",
};

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", resume_link: "", cover_note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.resume_link.trim()) errs.resume_link = "Resume link is required";
    else {
      try { new URL(form.resume_link); } catch { errs.resume_link = "Must be a valid URL"; }
    }
    if (!form.cover_note.trim()) errs.cover_note = "Cover note is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/applications`, { ...form, job_id: id });
      setSuccess(true);
      setForm({ name: "", email: "", resume_link: "", cover_note: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-100 rounded w-1/3" />
            <div className="h-40 bg-gray-100 rounded mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen">
        <div className="text-center py-20 text-gray-400">Job not found.</div>
      </div>
    );
  }

  const tags = Array.isArray(job.category) ? job.category : [job.category];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-10">
        <Link to="/jobs" className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-600 mb-6 transition-colors">
          <FiArrowLeft className="w-4 h-4" /> Back to jobs
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job Info */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 shrink-0">
                  {job.company?.charAt(0)}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiBriefcase className="w-3.5 h-3.5" /> {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-xs bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full border border-blue-100">
                      {job.type || "Full Time"}
                    </span>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagColors[tag] || "bg-gray-100 text-gray-600"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-base font-semibold text-gray-800 mb-3">Job Description</h2>
                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>
          </div>

          {/* Apply Form */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Apply Now</h2>

              {success ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-500 text-2xl">✓</span>
                  </div>
                  <p className="font-semibold text-gray-800">Application Submitted!</p>
                  <p className="text-sm text-gray-400 mt-1">We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                    { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
                    { id: "resume_link", label: "Resume Link (URL)", type: "url", placeholder: "https://..." },
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

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Cover Note</label>
                    <textarea
                      placeholder="Tell us why you're a great fit..."
                      rows={4}
                      value={form.cover_note}
                      onChange={(e) => { setForm({ ...form, cover_note: e.target.value }); setErrors({ ...errors, cover_note: "" }); }}
                      className={`w-full border rounded-xl text-sm px-4 py-2.5 outline-none focus:border-blue-500 resize-none transition-colors ${errors.cover_note ? "border-red-300" : "border-gray-200"}`}
                    />
                    {errors.cover_note && <p className="text-xs text-red-500 mt-1">{errors.cover_note}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
