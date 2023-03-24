export interface Payment {
  id: string;
  empresa: string;
  tipo: string;
  categoria: string;
  recorrencia: string;
  data_pagamento: string;
  valor: number;
  id_status: number;
  descricao_status: string;
  data_cadastro: string;
  codigo_boleto?: string;
  codigo_barras?: string;
  chave_pix?: string;
}
