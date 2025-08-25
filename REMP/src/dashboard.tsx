import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNavbar from './components/admin-nav-bar';
import MyListingCase from './components/DashboardComponents/dashboard-listing-case';
import { AgentList } from './components/DashboardComponents/dashboard-agent-list';
import { PhotographyCompanyList } from './components/DashboardComponents/photography-company-list';
import { PhotographyCompanyAgentList } from './components/DashboardComponents/photography-company-agent-list';
import DashboardPropertyEdit from './components/DashboardComponents/dashboard-property-edit';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const renderContent = () => {
    if (currentPath.startsWith('/property-edit/')) {
      return <DashboardPropertyEdit />;
    }
    
    switch (currentPath) {
      case '/listing-case':
        return <MyListingCase />;
      case '/agents':
        return <AgentList />;
      case '/photography-companies':
        return <PhotographyCompanyList />;
      case '/your-agents':
        return <PhotographyCompanyAgentList />;
      case '/property-edit':
        return <DashboardPropertyEdit />;
      default:
        return <MyListingCase />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Hi, Welcome!</h1>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;