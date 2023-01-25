import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "../../state/features/api";
import Header from "../../components/Header";
import columns from "./columnsData";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  //provide sort query to server through the transactions hook, returns data & isLoading
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    search,
    // convert sort property into json object
    sort: JSON.stringify(sort),
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Complete list of transactions" />
      <Box
        height="80vh"
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
          rows={(data && data.transactions) || []}
          getRowId={(row) => row._id}
          columns={columns}
          rowCount={(data && data.numOfTransactions) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          rowsPerPageOptions={[20, 50, 100]}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { setSearchInput, searchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
