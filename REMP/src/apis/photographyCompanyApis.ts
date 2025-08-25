import api from "../config/axios";
import { AgentResponseDto } from "../interface/agent";

const photographyCompanyApi = {
  addAgentToPhotographyCompany: (agentId: string) => 
    api.post<string>('/PhotographyCompany', JSON.stringify(agentId)),
  
  getAgentsByCompany: () => 
    api.get<AgentResponseDto[]>('/PhotographyCompany')
};

export default photographyCompanyApi;