export const Status = (status: string) => {
  if (status === "aprovado") {
    return (
      <>
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Aprovado</span>
        </span>
      </>
    );
  }
  if (status === "reprovado") {
    return (
      <>
        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Reprovado</span>
        </span>
      </>
    );
  }
  if (status === "pendente") {
    return (
      <>
        <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Pendente</span>
        </span>
      </>
    );
  }
};