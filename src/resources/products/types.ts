export interface ProductCreateInput {
  nome: string;
  descricao: string;
  preco: number;
  imagemUrls: string[]; // Um array de URLs de imagens
}

  
export interface ProductUpdateInput {
    nome?: string;
    descricao?: string;
    preco?: number;
    imagemUrl?: string;
  }
  