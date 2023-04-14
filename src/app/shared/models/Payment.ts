export interface Payment {
  id: string;
  empresa: string;
  tipo: string;
  categoria: string;
  recorrencia: string;
  data_vencimento: string;
  valor: number;
  status: number;
  data_cadastro: string;
  codigo_boleto: string;
  codigo_barras: string;
  chave_pix: string;
  copiado: boolean;
}

export interface PaymentRequest {
  empresa: string;
  tipo: string;
  categoria: string;
  recorrencia: string;
  data_vencimento: string;
  valor: number;
  codigo_boleto?: string;
  codigo_barras?: string;
  chave_pix?: string;
}

export interface PaymentResponse {
  meta: Meta;
  data: Payment[];
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  previous_page_url: string;
}
