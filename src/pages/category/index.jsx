import { Button } from "@mui/material";
import { CategoryModal } from "@modal";
import { CategoryTable } from "@ui";
import { useEffect, useState } from "react";
import { category } from "../../service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await category.get();
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
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
      <CategoryModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "#40E0D0", // Turquoise color
              color: "#FFFFFF", // White text color
              '&:hover': {
                backgroundColor: "#36CFC9", // Slightly darker turquoise for hover effect
              },
            }}
          >
            Add
          </Button>
        </div>
        <CategoryTable data={data} />
      </div>
    </>
  );
};

export default Index;
