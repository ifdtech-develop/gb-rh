import * as yup from "yup";
import { isCPF } from "validation-br";

yup.addMethod(yup.string, "cpf", function (errorMessage) {
  return this.test(`test-cpf`, errorMessage, function (value) {
    const { path, createError } = this;

    return isCPF(value) || createError({ path, message: errorMessage });
  });
});

export const userSchema = yup
  .object({
    cpf: yup
      .string()
      .cpf("Não é um CPF valido")
      .required("Este campo é obrigatório"),
    senha: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .max(120, "No máximo 120 caracteres")
      .required("Este campo é obrigatório"),
  })
  .required();
