"use strict";
const axios = require("axios");
const express = require("express");
const router = express.Router();
// const ProductController = require("../src/controllers/ProductController");

const API_KEY = process.env.API_KEY;
const API_PASSWORD = process.env.API_PASSWORD;
const STORE_NAME = process.env.STORE_NAME;
const API_VERSION = process.env.API_VERSION;

/*
    Get all products 
*/
router.get("/", async (req, res) => {
  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products.json`;

  try {
    const response = await axios.get(URL);
    // console.log(response.data.products)

    return res.send(response.data.products);
  } catch (error) {
    return res.status(200).json({
      status: 400,
      error: 1,
      message: error.message,
      data: null
    })
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
    return res.status(200).json({
      status: 400,
      error: 1,
      message: error.message,
      data: null
    })
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
    return res.status(200).json({
      status: 400,
      error: 1,
      message: error.message,
      data: null
    })
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
    return res.status(200).json({
      status: 400,
      error: 1,
      message: error.message,
      data: null
    })
  }
});

/*
    get publish status of a product
*/
router.get("/publish/:productId", async (req, res) => {
  const { productId } = req.params;

  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/product_listings/${productId}.json`;

  try {
    const response = await axios.get(URL);

    return res.status(200).json({
      status: 200,
      error: 0,
      message: "success",
      data: response.data,
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      error: 1,
      message: error.message,
      data: null
    })
  }
});

/*
    publish a product
*/
router.put("/publish/:productId", async (req, res) => {
  const { productId } = req.params;

  const product_listing = {
    product_id: productId
  }

  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/product_listings/${productId}.json`;

  try {
    const response = await axios.put(URL, { product_listing });

    return res.status(200).json({
      status: 200,
      error: 0,
      message: "success",
      data: response.data,
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      error: 1,
      message: error.message,
      data: null
    })
  }
});

/*
    unpublish a product
*/
router.delete("/publish/:productId", async (req, res) => {
  const { productId } = req.params;

  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/product_listings/${productId}.json`;

  try {
    const response = await axios.delete(URL);

    return res.status(200).json({
      status: 200,
      error: 0,
      message: "success",
      data: response.data,
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      error: 1,
      message: error.message,
      data: null
    })
  }
});

module.exports = router;
