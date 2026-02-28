import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider"
import { Link } from "react-router";
const Navbar = () => {
    const { user } = useContext(AuthContext)

    console.log(user);
    return (
           <nav className="flex items-center justify-between px-6 md:px-16 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
       <img className="w-7 h-7" src="/logo.png" alt="" />
        <span className="font-bold text-gray-900 text-lg">QuickHire</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/jobs" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
          Find Jobs
        </Link>
        <Link to="/companies" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
          Browse Companies
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="hidden md:block text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </nav>
    )
}

export default Navbar
