import React, { useState } from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Header from "../../components/Header";
import Product from "../../components/Product";

import { useGetProductsQuery } from "../../state/features/api";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {data ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((item) => {
            return (
              <Product
                key={item._id}
                _id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                category={item.category}
                supply={item.supply}
                stat={item.stat}
              />
            );
          })}
        </Box>
      ) : (
        <h2>Loading...</h2>
      )}
    </Box>
  );
};

export default Products;
