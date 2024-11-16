import { Link } from "react-router-dom";
import { ConnectButton } from '@coinbase/onchainkit';
import { Wallet, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              CryptoHacks
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/projects" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
              <User className="w-4 h-4" />
              Projects
            </Link>
            <Link to="/submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Submit Project
            </Link>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;