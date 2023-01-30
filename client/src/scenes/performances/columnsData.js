export default [
  {
    field: "_id",
    headerName: "ID",
    flex: 0.8,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 0.8,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 0.8,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.6,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 0.8,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];
