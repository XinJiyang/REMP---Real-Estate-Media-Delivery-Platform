
export interface UserRegisterRequestDto {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface PhotographyCompanyRegisterDto {
  username: string;
  email: string;
  password: string;
  photographyCompanyName: string;
  phoneNumber: string;
}


export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  contactPerson?: string;
  phoneNumber?: string;
  role: string;
}

export interface LoginResponseDto {
  token: string;
  user: UserDto;
}
