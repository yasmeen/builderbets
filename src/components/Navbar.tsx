import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CryptoHacks
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/projects" className="text-gray-700 hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="/submit" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
              Submit Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;