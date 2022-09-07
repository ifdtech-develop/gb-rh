const errors = {
  default: "Você não tem permissão para acessar essa página.",
};
export const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return errorMessage;
};