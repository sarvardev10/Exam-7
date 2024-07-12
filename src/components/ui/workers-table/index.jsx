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
import workers from "../../../service/workers";
import { WorkersModal } from "@modal";
import { useState } from "react";

// Define youthful and fun color scheme
const colors = {
  turquoise: "#40E0D0", // Turquoise color for headers
  white: "#FFFFFF", // White color for backgrounds
  gray: "#F0F0F0", // Light gray for alternating row background
  black: "#000000", // Black color for text and icons
};

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.turquoise, // Turquoise color for the header
    color: colors.white, // White text for the header
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: colors.black, // Black text for the body
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: colors.gray, // Light gray for odd rows
  },
  "&:nth-of-type(even)": {
    backgroundColor: colors.white, // White color for even rows
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: colors.black,
  "&:hover": {
    color: colors.turquoise,
  },
}));

const CustomizedTables = ({ data }) => {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  
  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };
  
  const deleteItem = async (id) => {
    try {
      const response = await workers.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <WorkersModal
        item={edit}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <TableContainer component={Paper} sx={{ backgroundColor: colors.white }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.gender}</StyledTableCell>
                <StyledTableCell align="center">{item.age}</StyledTableCell>

                <StyledTableCell align="center">
                  <StyledButton onClick={() => deleteItem(item.id)}>
                    <DeleteIcon />
                  </StyledButton>
                  <StyledButton onClick={() => editItem(item)}>
                    <EditIcon />
                  </StyledButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
