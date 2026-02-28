import { Link } from "react-router";

// Outlined pill styles — matching screenshot exactly
const tagStyles = {
  "Full-Time":  "border border-green-400 text-green-500",
  "Full Time":  "border border-green-400 text-green-500",
  "Part-Time":  "border border-blue-400 text-blue-500",
  "Part Time":  "border border-blue-400 text-blue-500",
  Marketing:    "border border-yellow-400 text-yellow-500",
  Design:       "border border-blue-700 text-blue-700",
  Technology:   "border border-purple-500 text-purple-500",
  Developer:    "border border-indigo-500 text-indigo-500",
  Management:   "border border-pink-500 text-pink-500",
  Business:     "border border-orange-400 text-orange-500",
  Finance:      "border border-teal-500 text-teal-500",
  Engineering:  "border border-red-400 text-red-500",
  "Human Resource": "border border-pink-400 text-pink-500",
};

const LatestJobCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    location,
    type = "Full Time",
    // Support both 'categories' (array) and legacy 'category' (string)
    categories,
    category,
    logo,
  } = job;

  // Build the categories list from whichever field exists
  const categoryList = categories
    ? categories
    : category
    ? [category]
    : [];

  // Tags: job type first, then categories
  const tags = [type, ...categoryList];

  return (
    <Link
      to={`/jobs/${_id}`}
      className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
    >
      {/* ── Company Logo ── */}
      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
        {logo ? (
          <img
            src={logo}
            alt={company}
            className="w-full h-full object-contain p-1.5"
            onError={(e) => {
              // If logo URL fails, fall back to initial letter
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <span
          className="text-gray-400 font-bold text-xl w-full h-full items-center justify-center"
          style={{ display: logo ? "none" : "flex" }}
        >
          {company?.charAt(0)}
        </span>
      </div>

      {/* ── Text Info ── */}
      <div className="flex flex-col gap-1.5 min-w-0">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-[15px] leading-snug">
          {title}
        </h3>

        {/* Company • Location */}
        <p className="text-sm text-gray-400">
          {company} • {location}
        </p>

        {/* Pill Tags */}
        <div className="flex flex-wrap gap-2 mt-0.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-medium px-3 py-1 rounded-full bg-transparent ${
                tagStyles[tag] || "border border-gray-300 text-gray-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default LatestJobCard;
