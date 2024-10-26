export interface UserCreateInput {
    nome: string;
    email: string;
    senha: string;
    role?: 'USER' | 'ADMIN';
  }
  
  export interface UserLoginInput {
    email: string;
    senha: string;
  }
  