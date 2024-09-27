import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !sizes
    ) {
      return res.json({ message: "Please fill all the fields" });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = await productModel.create(productData);

    if (!product) {
      return res.json({ success: false, message: "Failed to add product" });
    }

    res.json({ product, success: true, message: "Product added successfully" });
  } catch (error) {
    console.log("Error while adding product : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    if (!products) {
      return res.json({
        success: false,
        message: "Failed to listing products",
      });
    }

    res.json({
      products,
      success: true,
      message: "Products listed successfully",
    });
  } catch (error) {
    console.log("Error while listing products : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.body.id);

    if (!product) {
      return res.json({ success: false, message: "Failed to remove product" });
    }

    res.json({
      product,
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log("Error while removing product : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({
      product,
      success: true,
      message: "Product found successfully",
    });
  } catch (error) {
    console.log("Error while finding a single product : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
