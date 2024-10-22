export interface ProductCreateInput {
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl: string;
  }
  
export interface ProductUpdateInput {
    nome?: string;
    descricao?: string;
    preco?: number;
    imagemUrl?: string;
  }
  