import { Link } from "react-router-dom";
import {
  FiPenTool,
  FiTrendingUp,
  FiMegaphone,
  FiDollarSign,
  FiMonitor,
  FiCode,
  FiBriefcase,
  FiUsers,
} from "react-icons/fi";

const categories = [
  { name: "Design", count: 235, icon: FiPenTool, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Sales", count: 756, icon: FiTrendingUp, color: "text-green-500", bg: "bg-green-50" },
  { name: "Marketing", count: 140, icon: FiMegaphone, color: "text-white", bg: "bg-blue-600", active: true },
  { name: "Finance", count: 325, icon: FiDollarSign, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "Technology", count: 436, icon: FiMonitor, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Engineering", count: 142, icon: FiCode, color: "text-red-500", bg: "bg-red-50" },
  { name: "Business", count: 211, icon: FiBriefcase, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Human Resource", count: 346, icon: FiUsers, color: "text-pink-500", bg: "bg-pink-50" },
];

const Category = () => {
  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Explore by <span className="text-blue-600">category</span>
          </h2>
          <Link
            to="/jobs"
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            Show all jobs →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/jobs?category=${cat.name}`}
                className={`${
                  cat.active ? "bg-blue-600 text-white" : "bg-gray-50 hover:bg-blue-50 text-gray-700"
                } rounded-xl p-5 flex flex-col gap-3 group transition-all hover:shadow-md`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    cat.active ? "bg-white/20" : cat.bg
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${cat.active ? "text-white" : cat.color}`}
                  />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${cat.active ? "text-white" : "text-gray-800"}`}>
                    {cat.name}
                  </p>
                  <p className={`text-xs mt-0.5 flex items-center gap-1 ${cat.active ? "text-blue-100" : "text-gray-400"}`}>
                    {cat.count} jobs available →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
