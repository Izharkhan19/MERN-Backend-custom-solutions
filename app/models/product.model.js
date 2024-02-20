const { default: mongoose } = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, requird: true },
    price: { type: String, requird: true },
    cancelledprice: { type: String },
    category: { type: String },
    rating: { type: String },
    stockstatus: { type: String },
    productdescription: { type: String },
    productimagethumb: { type: String },
    productimages: { type: [String] },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("ProductSchema", ProductSchema);
