import { Link } from "react-router";
import dashboardImg from "../../assets/dashboard.png";

const PostJobBanner = () => {
  return (
    <section className="px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Outer wrapper — blue left block + white right area side by side */}
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-sm">

          {/* ── Left: Blue CTA block ── */}
          <div className="bg-blue-600 px-10 py-14 flex flex-col justify-center md:w-[42%] shrink-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Start posting <br /> jobs today
            </h2>
            <p className="mt-4 text-blue-100 text-sm">
              Start posting jobs for only $10.
            </p>
            <Link
              to="/admin"
              className="mt-8 inline-block border-2 border-white text-white font-semibold text-sm px-7 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors w-fit"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* ── Right: Dashboard screenshot ── */}
          <div className="bg-white flex items-center justify-center flex-1 px-8 py-8">
            <img
              src={dashboardImg}
              alt="QuickHire Dashboard"
              className="w-full max-w-xl object-contain rounded-xl shadow-md"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PostJobBanner;
