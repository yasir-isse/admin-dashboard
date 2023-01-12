import {
  Button,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const [isExpanded, setIsExpanded] = useState();
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            color: theme.palette.neutral[100],
          }}
          gutterBottom
        >
          {category}
        </Typography>

        <Typography variant="h5" component="div">
          {name}
        </Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {Number(price).toFixed(2)}
        </Typography>

        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded ? "See More" : "See Less"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Product;
