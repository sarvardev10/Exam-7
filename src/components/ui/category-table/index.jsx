import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import { category } from "../../../service";
import { useState } from "react";
import { CategoryModal } from "@modal";

// Define youthful and fun color scheme with updated colors
const colors = {
  turquoise: "#40E0D0", // Turquoise color
  yellow: "#FFFF00", // Yellow color
  white: "#FFFFFF", // White color for background
  black: "#000000", // Black color for typography
  gray: "#F0F0F0", // Light gray for alternate rows
};

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.turquoise, // Turquoise color for the header
    color: colors.white, // Black text for the header
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: colors.black, // Black text for the body
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: colors.white, // White color for odd rows
  },
  "&:nth-of-type(even)": {
    backgroundColor: colors.gray, // Light gray for even rows
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  "& .MuiTablePagination-select": {
    color: colors.black, // Black color for select dropdown
  },
  "& .MuiTablePagination-selectIcon": {
    color: colors.black, // Black color for select icon
  },
  "& .MuiTablePagination-spacer": {
    backgroundColor: colors.white, // White color for spacer
  },
  "& .MuiTablePagination-actions .MuiIconButton-root": {
    color: colors.black, // Black color for pagination buttons
  },
}));

const CustomizedTables = ({ data }) => {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const deleteItem = async (id) => {
    try {
      const response = await category.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <CategoryModal
        item={edit}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{page * rowsPerPage + index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.category_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => deleteItem(item.category_id)}>
                      <DeleteIcon />
                    </button>
                    <button onClick={() => editItem(item)}>
                      <EditIcon />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <StyledTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
