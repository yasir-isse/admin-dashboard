import React from "react";
import { Box } from "@mui/material";
import BreakdownChart from "../../components/BreakdownChart";
import Header from "../../components/Header";
const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box height="75vh" mt="mt40px">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
