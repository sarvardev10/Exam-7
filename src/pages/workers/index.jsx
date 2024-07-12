import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { WorkersModal } from "@modal";
import { WorkersTable } from "@ui";
import workers from "../../service/workers";

// Define the turquoise color
const colors = {
  turquoise: "#40E0D0", // Turquoise color
  white: "#FFFFFF", // White color for text
};

function Index() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await workers.get();
      if (response.status === 200 && response?.data?.user) {
        setData(response?.data?.user);
        console.log(response);
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
      <WorkersModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
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
            Add Worker
          </Button>
        </div>
        <WorkersTable data={data} />
      </div>
    </>
  );
}

export default Index;
