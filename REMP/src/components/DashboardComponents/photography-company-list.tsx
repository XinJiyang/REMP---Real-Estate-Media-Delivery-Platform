import React, { useState, useEffect } from 'react';
import userApi from '../../apis/userAPIs';
import { PhotographyCompanyResponseDto } from '../../interface/photography-company';

export const PhotographyCompanyList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [photographyCompanies, setPhotographyCompanies] = useState<PhotographyCompanyResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchPhotographyCompanies = async () => {
      try {
        const response = await userApi.getAllPhotographyCompanies();
        console.log(response)
        setPhotographyCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch photography companies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhotographyCompanies();
  }, []);
  
  const filteredCompanies = photographyCompanies.filter(company => 
    company.photographyCompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="w-full py-4">
      <div className="flex items-center mb-6">
        <div className="relative w-full max-w-md left-1/2 transform -translate-x-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
            placeholder="Search photography companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
       
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading photography companies...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr key={company.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {company.photographyCompanyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.phoneNumber || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No photography companies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
      </div>
    </div>
  );
};