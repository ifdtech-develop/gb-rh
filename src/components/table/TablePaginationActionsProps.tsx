import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CandidateProps } from "../../lib/candidate";
import { GetServerSideProps } from "next";
import axios from "axios";
import { TablePaginationActions } from "./TablePaginationActions";
import { TableHead } from "@mui/material";
import { columns } from "../../components/table/Column";
import { Modal } from "../modal";

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export const CustomPaginationActionsTable = ({
  data,
  total,
}: CandidateProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsData, setRowsData] = React.useState(data);

  React.useEffect(() => {
    axios
      .get("/api/candidate", {
        params: {
          skip: page * rowsPerPage,
          take: rowsPerPage,
        },
      })
      .then((res) => {
        setRowsData(res.data.data);
      });
  }, [page, rowsPerPage]);

  function createData(
    name: string,
    cargo: string,
    id: number,
    curriculo: string,
    phone: string,
    status: string,
    stage: string
  ) {
    return { name, cargo, id, curriculo, phone, status, stage };
  }

  let rows = rowsData?.map((row) => {
    return createData(
      row.firstName + " " + row.lastName,
      row.cargo,
      row.id,
      row.curriculo,
      row.phone,
      row.status,
      row.stage
    );
  });

  React.useEffect(() => {
    rows = rowsData?.map((row) => {
      return createData(
        row.firstName + " " + row.lastName,
        row.cargo,
        row.id,
        row.curriculo,
        row.phone,
        row.status,
        row.stage
      );
    });
  }, [rowsData]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead className="sticky top-0">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id} className="odd:bg-gray-100">
                <TableCell style={{ width: 20 }}>{row.id}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.cargo}</TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.phone}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.status}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.stage}° Etapa
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <a
                    // className="text-blue-400 underline hover:underline-offset-4"
                    href={`https://gb-rh.s3.amazonaws.com/${row.curriculo}`}
                    target="_blank"
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Curriculo
                    </button>
                  </a>
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">

                <Modal />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  25,
                  50,
                  { label: "Todos", value: total },
                ]}
                colSpan={8}
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "Linhas por pagina",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
