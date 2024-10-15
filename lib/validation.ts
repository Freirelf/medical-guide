import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string()
  .min(2,"Nome deve ter pelo menos 2 caracteres.")
  .max(50,"Nome deve ter no máximo 50 caracteres."),
  email: z.string().email("Email inválido."),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Telefone inválido."),
  
});