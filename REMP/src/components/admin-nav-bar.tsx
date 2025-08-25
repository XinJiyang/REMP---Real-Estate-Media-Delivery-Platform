import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashboardNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { hasRole, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-[#0085CA] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold">
                <img className="h-5" src="/images/recam-logo.png" alt="Recam" />
              </Link>
            </div>
            <div className="hidden md:block ml-8">
              <div className="flex items-center space-x-4">
                {/* Listing Cases - All roles can see this */}
                <Link
                  to="/listing-case"
                  className={`px-3 py-2 rounded-md text-sm text-white ${
                    isActive('/listing-case') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
                  } transition-colors duration-200`}
                >
                  Listing Cases
                </Link>
                
                {/* Agents - Only Admin and PhotographyCompany can see this */}
                {hasRole(['Admin']) && (
                  <Link
                    to="/agents"
                    className={`px-3 py-2 rounded-md text-sm text-white ${
                      isActive('/agents') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
                    } transition-colors duration-200`}
                  >
                    Agents
                  </Link>
                )}

                {hasRole(['PhotographyCompany']) && (
                  <Link
                    to="/your-agents"
                    className={`px-3 py-2 rounded-md text-sm text-white ${
                      isActive('/your-agents') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
                    } transition-colors duration-200`}
                  >
                    Agents
                  </Link>
                )}
                
                {/* Photography Companies - Only Admin can see this */}
                {hasRole('Admin') && (
                  <Link
                    to="/photography-companies"
                    className={`px-3 py-2 rounded-md text-sm text-white ${
                      isActive('/photography-companies') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
                    } transition-colors duration-200`}
                  >
                    Photography Companies
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="text-white bg-transparent p-2 rounded-full hover:bg-blue-600"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Listing Cases - All roles can see this */}
            <Link
              to="/listing-case"
              className={`block px-3 py-2 rounded-md text-base text-white ${
                isActive('/listing-case') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Listing Cases
            </Link>
            
            {/* Agents - Only Admin and PhotographyCompany can see this */}
            {hasRole(['Admin']) && (
              <Link
                to="/agents"
                className={`block px-3 py-2 rounded-md text-base text-white ${
                  isActive('/agents') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Agents
              </Link>
            )}

            {hasRole(['PhotographyCompany']) && (
              <Link
                to="/your-agents"
                className={`block px-3 py-2 rounded-md text-base text-white ${
                  isActive('/your-agents') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Agents
              </Link>
            )}
            
            {/* Photography Companies - Only Admin can see this */}
            {hasRole('Admin') && (
              <Link
                to="/photography-companies"
                className={`block px-3 py-2 rounded-md text-base text-white ${
                  isActive('/photography-companies') ? 'bg-blue-600 font-medium' : 'font-medium hover:bg-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Photography Companies
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-blue-600">
            <div className="px-2">
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base text-white hover:bg-blue-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;