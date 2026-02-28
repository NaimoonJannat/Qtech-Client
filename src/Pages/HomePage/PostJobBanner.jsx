import { Link } from "react-router";

const PostJobBanner = () => {
  return (
    <section className="px-6 md:px-16 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-blue-600 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
          {/* Text */}
          <div className="text-white max-w-xs">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              Start posting jobs today
            </h2>
            <p className="mt-2 text-blue-100 text-sm">
              Start posting jobs for only $10.
            </p>
            <Link
              to="/admin"
              className="mt-6 inline-block bg-white text-blue-600 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Dashboard preview */}
          <div className="hidden md:block flex-1 max-w-sm">
            <div className="bg-white rounded-xl shadow-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <div className="flex gap-3 mb-3">
                <div className="bg-blue-50 rounded-lg p-3 flex-1 text-center">
                  <p className="text-xl font-bold text-blue-600">2,342</p>
                  <p className="text-xs text-gray-400 mt-1">Total Jobs</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 flex-1 text-center">
                  <p className="text-xl font-bold text-green-600">158</p>
                  <p className="text-xs text-gray-400 mt-1">New Today</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 flex-1 text-center">
                  <p className="text-xl font-bold text-purple-600">67</p>
                  <p className="text-xs text-gray-400 mt-1">Applied</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mb-2">
                <div className="h-2 bg-blue-400 rounded-full w-3/4" />
              </div>
              <div className="h-2 bg-gray-100 rounded-full mb-2">
                <div className="h-2 bg-green-400 rounded-full w-1/2" />
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-purple-400 rounded-full w-1/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostJobBanner;
