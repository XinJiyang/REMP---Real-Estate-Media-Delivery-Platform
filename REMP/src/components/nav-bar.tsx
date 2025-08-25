import { Download } from 'lucide-react';
import React, { ReactElement, useState } from 'react';

interface NavItemProps {
  text: string;
  href: string;
  icon?: ReactElement;
};

interface NavbarProps {
  showDownload?: boolean;
  items: NavItemProps[];
};

const Navbar: React.FC<NavbarProps> = ({ showDownload=false, items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-44 py-3">
      <div className="flex flex-wrap items-center max-w-screen-xl">
        {showDownload&&(
          <a href="/" className="flex gap-2 px-4 py-1 rounded-3xl bg-[#109ae2] items-center">
            <span className="bg-white rounded-full p-1">
              <Download className="h-1.5 w-1.5 text-[#109ae2] font-bold"/>
            </span>
            <span className="self-center text-sm text-white whitespace-nowrap">Download files</span>
          </a>
        )}

        {/* 手机端 */}
        <div className="flex items-center lg:order-2">  
            <button 
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
        </div>
        
        <div 
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ml-auto`}
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row gap-4 lg:mt-0">
            {items.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};


const NavItem: React.FC<NavItemProps> = ({ text, href, icon}) => {
  return (
    <li>
      <a
        href={href}
        className={`flex items-center justify-center text-center px-5 py-1 rounded-2xl border-2 border-black` }
          
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-sm text-black">{text}</span>
      </a>
    </li>
  );
};


export default Navbar;