import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import cookieService from '../../config/cookie';
import userApi from '../../apis/userAPIs';
import { useToast } from '../../hooks/use-toast';
import { AgentResponseDto } from '../../interface/agent';



interface EditAgentProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AgentResponseDto;
  refetch: () => Promise<void>;
}

const EditAgent: React.FC<EditAgentProps> = ({ isOpen, onClose, agent, refetch }: EditAgentProps) => {
  const [email, setEmail] = useState<string>('');
  const [agentFirstName, setAgentFirstName] = useState<string>('');
  const [agentLastName, setAgentLastName] = useState<string>('');
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = cookieService.getToken();
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (agent) {
      setEmail(agent.email || '');
      setAgentFirstName(agent.firstName || '');
      setAgentLastName(agent.lastName || '');
      setCompanyName(agent.companyName || '');
      setPhoneNumber(agent.phoneNumber || '');
      if (agent.avatarUrl) {
        setAvatarPreview(agent.avatarUrl);
      }
    }
  }, [agent]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarImage(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const phoneRegex = /^(?:0)?4\d{8}$/;
    e.preventDefault();

    if (!email) {
      setError("Please input email address");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid Australian mobile number");
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const token = cookieService.getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      const formData = new FormData();
      formData.append('id', agent.id);
      formData.append('email', email);
      formData.append('agentFirstName', agentFirstName);
      formData.append('agentLastName', agentLastName);
      formData.append('companyName', companyName);
      formData.append('phoneNumber', phoneNumber);
      
      if (avatarImage) {
        formData.append('avatarImage', avatarImage);
      }
      
      await userApi.updateAgent(formData);
      refetch();
      onClose();
      toast({
        description: "Agent updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating agent:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to update agent. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl p-6">
        <div className="flex flex-col justify-between mb-3">
          <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
          <h2 className="text-md font-semibold text-gray-800">Edit Agent</h2>
          <p className="text-xs">Update agent details as needed.</p>
        </div>

        <div className='h-[1.5px] bg-[#F2F2F2]'></div>
        {error && (
          <div className="mt-3 bg-red-50 p-3 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='max-h-96 overflow-y-auto'>
            <div className="mb-6 mt-9">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                className="pl-4 w-full border border-gray-300 bg-gray-200 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                required
                disabled
              />
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Agent Name</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">First Name</label>
                  <input 
                    type="text" 
                    value={agentFirstName}
                    onChange={(e) => setAgentFirstName(e.target.value)}
                    className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    value={agentLastName}
                    onChange={(e) => setAgentLastName(e.target.value)}
                    className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Company</label>
              <div>        
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  required
                />    
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Phone Number</label>
              <div>        
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                />    
              </div>
            </div>
            
            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Avatar Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center gap-4">
                {avatarPreview ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">+</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleClickUpload}
                  className="text-sm py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  {avatarPreview ? 'Change Image' : 'Upload Image'}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-[#F2F2F2] flex justify-end gap-3 pt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="text-sm py-2 w-24 text-center border-2 border-black text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="text-sm py-2 w-24 bg-[#14a2ea] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAgent;