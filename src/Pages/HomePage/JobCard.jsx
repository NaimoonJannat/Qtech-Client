import { Link } from "react-router";

const tagColors = {
  Marketing: "bg-yellow-100 text-yellow-700",
  Design: "bg-blue-100 text-blue-700",
  Business: "bg-green-100 text-green-700",
  Technology: "bg-purple-100 text-purple-700",
  Developer: "bg-indigo-100 text-indigo-700",
  Management: "bg-pink-100 text-pink-700",
};

const JobCard = ({ job, variant = "grid" }) => {
  const {
    _id,
    title,
    company,
    location,
    type = "Full Time",
    category,
    description,
    logo,
  } = job;

  const tags = Array.isArray(category) ? category : [category];

  if (variant === "list") {
    // List layout used in "Latest Jobs Open"
    return (
      <Link
        to={`/jobs/${_id}`}
        className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
      >
        {/* Logo */}
        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
          {logo ? (
            <img src={logo} alt={company} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-gray-500 font-bold text-lg">
              {company?.charAt(0)}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {company} • {location}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {type}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  tagColors[tag] || "bg-gray-100 text-gray-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  // Grid layout used in "Featured Jobs"
  return (
    <Link
      to={`/jobs/${_id}`}
      className="block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          {logo ? (
            <img src={logo} alt={company} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-gray-500 font-bold text-lg">
              {company?.charAt(0)}
            </span>
          )}
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full border border-blue-100">
          {type}
        </span>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {company} · {location}
        </p>
        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              tagColors[tag] || "bg-gray-100 text-gray-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default JobCard;
