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
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload"; // Updated icon
import { useNavigate } from "react-router-dom";
import { productsApi } from "../../../service";
import { IconButton, Button } from "@mui/material";

// Define youthful and fun color scheme
const colors = {
  turquoise: "#40E0D0", // Turquoise color
  // yellow: "#FFFF00", // Yellow color
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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: colors.white, // White background for the table container
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: colors.yellow,
  border: `1px solid ${colors.yellow}`,
  "&:hover": {
    backgroundColor: colors.yellow,
    color: colors.black,
  },
}));

const CustomizedTables = ({ data }) => {
  const navigate = useNavigate();
  
  const deleteItem = async (id) => {
    try {
      const response = await productsApi.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = (id) => {
    console.log(`Upload action clicked for product with ID: ${id}`);
  };

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: colors.white }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.product_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.color}</StyledTableCell>
                <StyledTableCell align="center">{item.size}</StyledTableCell>
                <StyledTableCell align="center">{item.count}</StyledTableCell>
                <StyledTableCell align="center">{item.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton onClick={() => deleteItem(item.product_id)}>
                    <DeleteIcon sx={{ color: colors.black }} />
                  </StyledButton>
                  <IconButton
                    onClick={() => handleNavigate(item.product_id)}
                    sx={{ color: colors.black, "&:hover": { color: colors.black } }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUpload(item.product_id)}
                    aria-label="upload image"
                    sx={{ color: colors.black, "&:hover": { color: colors.black } }}
                  >
                    <UploadIcon /> {/* Updated icon */}
                  </IconButton>
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
