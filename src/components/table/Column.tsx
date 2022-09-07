interface Column {
  id:
    | "name"
    | "cargo"
    | "id"
    | "email"
    | "phone"
    | "status"
    | "stage"
    | "actions"
    | "date"
    | "curriculo";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 20,
  },
  { id: "name", label: "Nome", align: "center" },
  { id: "cargo", label: "Cargo", minWidth: 160, align: "center" },
  { id: "phone", label: "Telefone", minWidth: 100, align: "center" },
  { id: "status", label: "Status", minWidth: 100, align: "center" },
  { id: "stage", label: "Etapa", minWidth: 100, align: "center" },
  {
    id: "curriculo",
    label: "Curriculo",
    minWidth: 170,
    align: "center",
  },
  { id: "actions", label: "Ações", minWidth: 170, align: "center" },
];
