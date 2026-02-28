import { useState } from "react";
import { Link } from "react-router";
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
             <img className="w-7 h-7" src="/logo.png" alt="" />
        <span className="font-bold text-white text-lg">QuickHire</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        {/* About */}
        <div>
          <h4 className="text-white font-semibold mb-4">About</h4>
          <ul className="space-y-2 text-sm">
            {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-2">Get job notifications</h4>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          2021 @ QuickHire. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {[FiFacebook, FiInstagram, FiLinkedin, FiTwitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
