import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

import getCountryIso3 from "country-iso-2-to-3";

//Products Controller
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const producstWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, stat };
      })
    );
    res.status(200).json(producstWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Customers Controller
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Transactions Controller
export const getTransactions = async (req, res) => {
  try {
    // info from client: {field:'', sort:'asc || desc'}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //format sort info: {field: value} >> ex. {userId:-1}
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };

    // sort query exist? parse & return a formatted sort query : use default sort
    const sortQuery = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      //sort options: cost & userID
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortQuery)
      .skip(page * pageSize)
      .limit(pageSize);

    const numOfTransactions = await Transaction.countDocuments({
      name: { $regex: new RegExp(search, "i") },
    });

    res.status(200).json({ transactions, numOfTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Geography Controller

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    //convert 2 letter country to 3 letters & assign value
    const mappedLocations = users.reduce((acc, { country }) => {
      //convert from 2 to 3 letter country name
      const countryISO3 = getCountryIso3(country);
      //if country doesnt exsist, create one
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      //increase num of users in the country
      acc[countryISO3]++;

      //return list of countries with num of users {country:numOfUsers}
      return acc;
    }, {});

    //convert mappedLocations into nivo-chart format {id:country,value:numOfUsers}
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => ({ id: country, value: count })
    );
    return res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
