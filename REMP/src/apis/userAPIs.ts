import api from "../config/axios";
import { AgentResponseDto,  SearchAgentResponseDto } from "../interface/agent";
import { PhotographyCompanyResponseDto } from "../interface/photography-company";
import { LoginRequestDto, LoginResponseDto, PhotographyCompanyRegisterDto, UserDto, UserRegisterRequestDto } from "../interface/user";

const userApi = {
  createAdmin: (data: UserRegisterRequestDto) => 
    api.post<{ message: string }>('/User/CreateAdmin', data),
  
  createPhotographyCompany: (data: PhotographyCompanyRegisterDto) => 
    api.post<string>('/User/CreatePhotographyCompany', data),
  
  createAgent: (data: FormData) => 
    api.post<UserDto>('/User/CreateAgentAccount', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),

  updateAgent: (data: FormData) => 
    api.put<AgentResponseDto>('/User/update-agent', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  
  deleteAgent: (id: string) => 
    api.delete<{ message: string }>(`/User/delete-agent/${id}`),

  findAgentByEmail: (email: string) => 
    api.get<SearchAgentResponseDto>(`/User/FindAgentByEmail/${email}`),

  searchAgents: (searchTerm: string) =>
    api.get<SearchAgentResponseDto[]>(`/User/search-agent?searchTerm=${encodeURIComponent(searchTerm)}`),

  login: (data: LoginRequestDto) => 
    api.post<{ message: string; data: LoginResponseDto }>('/User/login', data),
  
  getCurrentUser: () => 
    api.get<UserDto>('/User/me'),

  getAllAgents: () =>
    api.get<AgentResponseDto[]>('/User/GetAllAgents'),
  
  getAllPhotographyCompanies: () =>
    api.get<PhotographyCompanyResponseDto[]>('/User/GetAllPhotographyCompany')

};

export default userApi;