"use strict";
const axios = require("axios");
const express = require("express");
const router = express.Router();

const API_KEY = process.env.API_KEY;
const API_PASSWORD = process.env.API_PASSWORD;
const STORE_NAME = process.env.STORE_NAME;
const API_VERSION = process.env.API_VERSION;

/*
    Get all products 
*/
router.get("/", async (req, res) => {
  // return res.json('oke')
  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products.json`;
  try {
    const response = await axios.get(URL);
    // console.log(response.data.products)

    return res.send(response.data.products);
  } catch (error) {
    throw new Error("Fetch failed");
  }
});

/*
    create a new product
*/
router.post("/", async (req, res) => {
  const { product } = req.body.data;

  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products.json`;

  try {
    const response = await axios.post(URL, { product });

    const productCreated = response.data.product ? response.data.product : {};

    return res.status(200).json({
      status: 200,
      error: 0,
      message: "success",
      data: productCreated,
    });
  } catch (error) {
    console.log({ error });
  }
});

/*
    update a product
*/
router.put("/", async (req, res) => {
  const { product } = req.body.data;

  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products/${product.id}.json`;

  try {
    const response = await axios.put(URL, { product });

    const productUpdated = response.data.product ? response.data.product : {};

    return res.status(200).json({
      status: 200,
      error: 0,
      message: "success",
      data: productUpdated,
    });
  } catch (error) {
    console.log({ error });
  }
});

/*
    delete a product
*/
router.delete("/:productId", async (req, res) => {
    const { productId } = req.params;
  
    const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products/${productId}.json`;
  
    try {
      const response = await axios.delete(URL);
  
      return res.status(200).json({
        status: 200,
        error: 0,
        message: "success",
        data: response.data,
      });
    } catch (error) {
      console.log({ error });
    }
  });

module.exports = router;
