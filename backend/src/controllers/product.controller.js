import slugify from "slugify";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {Product} from "../models/product.model.js"
import { uploadOnCloudinary } from "../utils/clodinary.js";

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, category, description, quantity, shipping } = req.body;
    const photoLocalPath = req.files && req.files.photo && req.files.photo.length > 0 ? req.files.photo[0].path : null;

    // Validate required fields
    if (!name || !price || !category || !description || !quantity) {
        throw new ApiError(400, "All fields are required");
    }

    const photoObject = await uploadOnCloudinary(photoLocalPath);

    const product = await Product.create({
        name,
        price,
        category,
        description,
        quantity,
        slug: slugify(name),
        photo:photoObject?.url||"https://res-console.cloudinary.com/dwixyksno/thumbnails/v1/image/upload/v1732525801/ODAwcHgtTm9faW1hZ2VfYXZhaWxhYmxlLnN2Z19odjJ3aTA=/drilldown"
    });
    res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, category, description, quantity, shipping } = req.body;

    // Validate required fields
    if (!name || !price || !category || !description || !quantity) {
        throw new ApiError(400, "All fields are required");
    }


    const {id}=req.params
    if(!id) throw new ApiError(400,"Id is required")
    const product = await Product.findByIdAndUpdate(id,{
        name,
        price,
        category,
        description,
        quantity,
        slug: slugify(name),
    },{new:true});
    res.status(200).json(product);
});

const deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params
    if(!id) throw new ApiError(400,"Id is required")
    const deletedProduct=await Product.findByIdAndDelete(id)

    if(!deleteProduct) throw new ApiError(500,"Some error occured")
    res.status(200).json({message:"Product deleted successfully"})
});

const getAllProducts=asyncHandler(async(req,res)=>{
    const {category,minPrice,maxPrice,search}=req.query;

    let query={};

    if(category)
        query.category=category

    if(minPrice||maxPrice){
        query.price={}
        if(minPrice) query.price.$gte=parseInt(minPrice)
        if(maxPrice) query.price.$lte=parseInt(maxPrice)
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    } 

    const products=await Product.find(query).populate("category").limit(12).sort({createdAt:-1})
    if(!products) throw new ApiError(404,"No products found")

    res.status(200).json({"productsCount":products.length,"products":products})
});

const getSingleProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id).populate("category")
    if(!product) throw new ApiError(404,"Prodcut not found")

    return res.status(200).send(product)
});

const getSimilarProducts=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(!id) throw new ApiError(400,"Id is not present")
    
    const product=await Product.findById(id)
    const query={}
    query.category=product.category

    const similarProducts=await Product.find(query)
    
    const filteredSimilarProducts=similarProducts.filter(pro=>
        String(pro._id)!==String(product._id)
    )
    return res.status(200).send(filteredSimilarProducts)
})

export {createProduct,updateProduct,deleteProduct,getAllProducts,getSingleProduct,getSimilarProducts}