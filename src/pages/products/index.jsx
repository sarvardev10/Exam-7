import { Search } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { ProductsModal } from "@modal";
import productsApi from "../../service/products";
import { ProductsTable } from "@ui";

// Define the turquoise color
const colors = {
  turquoise: "#40E0D0", // Turquoise color
  white: "#FFFFFF", // White color for text
  gray: "#F0F0F0", // Light gray for search icon
};

function Index() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await productsApi.get();
      if (response.status === 200 && response?.data?.products) {
        setData(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ProductsModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex justify-between items-center my-5">
        <div className="relative w-[400px]">
          <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            InputProps={{
              startAdornment: (
                <Search className="h-5 w-5 text-gray-400" />
              ),
              disableUnderline: true,
              style: {
                padding: "4px 36px 4px 12px",
                fontSize: "12px",
                height: "35px",
              },
            }}
            sx={{
              backgroundColor: colors.white, // White background for search field
              borderRadius: "4px",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.gray, // Gray border color
                },
                '&:hover fieldset': {
                  borderColor: colors.turquoise, // Turquoise border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.turquoise, // Turquoise border color when focused
                },
              },
            }}
          />
        </div>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: colors.turquoise, // Turquoise color
            color: colors.white, // White text color
            '&:hover': {
              backgroundColor: "#36CFC9", // Slightly darker turquoise for hover effect
            },
          }}
        >
          Add Products
        </Button>
      </div>
      <ProductsTable data={data} />
    </>
  );
}

export default Index;
