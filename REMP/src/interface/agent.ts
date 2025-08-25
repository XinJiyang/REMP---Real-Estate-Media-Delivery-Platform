export interface Agent{
  id:number,
  name:string,
  company:string,
  agentImage:string,
}

export interface CreateAgentRequestDto {
  email: string;
  agentFirstName: string;
  agentLastName: string;
  avatarUrl: string;
  companyName: string;
  phoneNumber: string;
}
export interface AgentResponseDto {
  id:string,
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  companyName: string;
  phoneNumber: string;
}

export interface SearchAgentResponseDto {
  id:string;
  agentFirstName: string;
  agentLastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
}