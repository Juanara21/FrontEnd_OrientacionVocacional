export interface Question {
  id?: number;
  descripcion: string;
  CareerId: number;
  Career?: {
    career: string;
  };
  respuesta?: number;
}
