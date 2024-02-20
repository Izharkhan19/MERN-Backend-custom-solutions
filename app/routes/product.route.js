const express = require("express");
const {
  getProdcts,
  createProdcts,
  getProdctById,
  updateProdcts,
  deleteProdcts,
} = require("../controllers/product.controller");
const productRouter = express.Router();

productRouter.get("/product", getProdcts);
productRouter.post("/product", createProdcts);
productRouter.get("/product/:id", getProdctById);
productRouter.put("/product/:id", updateProdcts);
productRouter.delete("/product/:id", deleteProdcts);

module.exports = productRouter;
