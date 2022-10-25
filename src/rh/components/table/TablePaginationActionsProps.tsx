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
import { columns } from "./Column";
import { Modal } from "../modal";
import moment from "moment";
import { CompanyProps } from "../../types/company";
import { UserProps } from "../../types/user";
import { Status } from "./Status";

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
  // companys,
  id,
}: CandidateProps & UserProps) => {
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
    id: number,
    // name: string,
    company: string,
    sector: string,
    type_vacancy: string,
    manager: string,
    vacancy: string,
    schooling: string,
    hiring_justification: string,
    experience: string,
    languages: string,
    start_forecast: Date,
    document: string,
    username: string,
    status: string,
    status2: string,
    userid: number,
    controllership: number,
    director: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    return {
      id,
      // name,
      company,
      sector,
      type_vacancy,
      manager,
      vacancy,
      schooling,
      hiring_justification,
      experience,
      languages,
      start_forecast,
      document,
      username,
      status,
      status2,
      userid,
      controllership,
      director,
      createdAt,
      updatedAt,
    };
  }

  let rows = rowsData?.map((row) => {
    return createData(
      row.id,
      // row.name,
      row.company,
      row.sector,
      row.type_vacancy,
      row.manager,
      row.vacancy,
      row.schooling,
      row.hiring_justification,
      row.experience,
      row.languages,
      row.start_forecast,
      row.document,
      row.username,
      row.status,
      row.status2,
      row.userid,
      row.controllership,
      row.director,
      row.createdAt,
      row.updatedAt
    );
  });

  React.useEffect(() => {
    rows = rowsData?.map((row) => {
      return createData(
        row.id,
        // row.name,
        row.company,
        row.sector,
        row.type_vacancy,
        row.manager,
        row.vacancy,
        row.schooling,
        row.hiring_justification,
        row.experience,
        row.languages,
        row.start_forecast,
        row.document,
        row.username,
        row.status,
        row.status2,
        row.userid,
        row.controllership,
        row.director,
        row.createdAt,
        row.updatedAt
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
      <TableContainer component={Paper} className="flex justify-center">
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
                {/* <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell> */}
                <TableCell align="center">{row.vacancy}</TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.manager}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {Status(row.status)}
                </TableCell>
                {/* <TableCell style={{ width: 160 }} align="center">
                  {row.languages}
                </TableCell> */}
                <TableCell style={{ width: 160 }} align="center">
                  {moment(`${row.createdAt}`).fromNow()}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.document ? (
                    <a
                      // className="text-blue-400 underline hover:underline-offset-4"
                      href={`https://gb-rh.s3.amazonaws.com/${row.document}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Documento
                      </button>
                    </a>
                  ) : (
                    <button className="bg-gray-500 text-white font-bold py-1 px-4 rounded cursor-not-allowed">
                      Sem Documento
                    </button>
                  )}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Modal row={row} id={id} />
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
                colSpan={9}
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
