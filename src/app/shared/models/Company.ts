export interface Company {
  id: string;
  documento: string;
  descricao: string;
  descricao_resumida: string;
  categoria: string;
  tipo_contato: number;
  contato: string;
  representante: string;
  data_cadastro: string;
}

export interface CompanyRequest {
  documento: string;
  descricao: string;
  descricao_resumida: string;
  categoria: string;
  tipo_contato: string;
  contato: string;
  representante: string;
}
