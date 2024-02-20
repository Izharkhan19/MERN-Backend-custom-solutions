const ProductSchema = require("../models/product.model");

const createProdcts = async (req, res) => {
  const {
    name,
    price,
    cancelledprice,
    category,
    rating,
    stockstatus,
    productdescription,
    productimagethumb,
    productimages,
  } = req.body;

  const newProdcts = new ProductSchema({
    name: name,
    price: price,
    cancelledprice: cancelledprice,
    category: category,
    rating: rating,
    stockstatus: stockstatus,
    productdescription: productdescription,
    productimagethumb: productimagethumb,
    productimages: productimages,
  });

  try {
    await newProdcts.save();
    res.status(201).json(newProdcts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updateProdcts = async (req, res) => {
  const prodId = req.params.id;
  console.log("prodId : ============= :", prodId);
  const {
    name,
    price,
    cancelledprice,
    category,
    rating,
    stockstatus,
    productdescription,
    productimagethumb,
    productimages,
  } = req.body;

  const newProduct = {
    name: name,
    price: price,
    cancelledprice: cancelledprice,
    category: category,
    rating: rating,
    stockstatus: stockstatus,
    productdescription: productdescription,
    productimagethumb: productimagethumb,
    productimages: productimages,
  };

  try {
    await ProductSchema.findByIdAndUpdate(prodId, newProduct, {
      new: true,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const deleteProdcts = async (req, res) => {
  const prodId = req.params.id;
  console.log(prodId);
  try {
    const Prodct = await ProductSchema.findOneAndDelete({ _id: prodId });
    res.status(202).json(Prodct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getProdcts = async (req, res) => {
  try {
    const prodcts = await ProductSchema.find();
    res.status(200).json(prodcts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getProdctById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductSchema.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  createProdcts,
  updateProdcts,
  deleteProdcts,
  getProdcts,
  getProdctById,
};
