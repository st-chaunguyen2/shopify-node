"use strict";
const axios = require("axios");
const express = require("express");
const router = express.Router();

const API_KEY = process.env.API_KEY;
const API_PASSWORD = process.env.API_PASSWORD;
const STORE_NAME = process.env.STORE_NAME;
const API_VERSION = process.env.API_VERSION;

/*
    remove a product from collection
*/
router.post("/remove-product", async (req, res) => {
    const { productId, collectionId } = req.body.data;

    // get collect
    const CollectURL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/collects.json?product_id=${productId}&collectionid=${collectionId}`;
    const collect = await axios.get(CollectURL);
    const collectId = collect.data.collects[0].id;
  
    // remove a product from collection
    const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/collects/${collectId}.json`;
  
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
    add a product to collection
*/
router.post("/add-product", async (req, res) => {
  const { productId, collectionId } = req.body.data;

  const collect = {
    product_id: productId,
    collection_id: collectionId
  }

  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/collects.json`;

  try {
    const response = await axios.post(URL, { collect });

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