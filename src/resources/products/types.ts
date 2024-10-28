export interface ProductCreateInput {
  nome: string;
  descricao: string;
  preco: number;
  imagemUrls: string[];
}

  
export interface ProductUpdateInput {
    nome: string;
    descricao: string;
    preco: number;
    imagemUrls: string[]; 
  }
  