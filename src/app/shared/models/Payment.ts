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
