import React from "react";

import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetCustomersQuery } from "../../state/features/api";
import Header from "../../components/Header";
import columns from "./columnsData";
const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[200],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          rows={data || []}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
