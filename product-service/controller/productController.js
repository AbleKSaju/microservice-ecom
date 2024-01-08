 import {Product} from '../model/productModel.js'
 import { serviceToProducer } from '../kafka/serviceToProducer.js'
import { serviceToConsumer } from '../kafka/serviceToConsumer.js'
 
 export const firstRequest=async(req,res)=>{
    try {
        res.status(200).json("first request is sucess ")
    } catch (error) {
        res.status(400).json("Error happened in product-service in fisrtRequest " + error)
    }
}


//create product
export const createProduct=async(req,res)=>{
    try {
        console.log("ent");
        const {title,catogary,description,price,stoke}=req.body
        console.log(title,catogary,description,price,stoke);

       const productExist=await Product.findOne({title})

       if(productExist){
        res.status(400).json('This product is Already exist')
       }else{
        console.log('yp');
        const newProduct =new Product({
            title,
            catogary,
            description,
            price,
            stoke
        }) 
        console.log(newProduct,"new");

        await newProduct.save()
        res.status(200).json(newProduct)

       }

    } catch (error) {
        res.status(400).json("Error happened in product-service in createProduct " + error)
        
    }
}
//edit product
export const editProduct=async(req,res)=>{
    try {
        const {title,catogary,description,price,id}=req.body

        const product=await Product.findByIdAndUpdate(id,{
            title:title,
            catogary:catogary,
            description:description,
            price:price,
              

        },{new:true})

        await product.save()

        res.status(200).json(product)

    } catch (error) {
        res.status(400).json("Error happened in product-service in editProduct " + error)
        
    }
}


//list product
export const getAllProduct=async(req,res)=>{
    try {

        const products=await Product.find({status:{$ne:false}})
        if(products.length==0){
            res.status(400).json("No product found..!")
        }else{
            res.status(200).json(products)
        }
        
        
    } catch (error) {
        res.status(400).json("Error happened in product-service in getAllProduct " + error)
        
    }
}




//filer product in catogary wise
export const filterCatogaryProduct=async(req,res)=>{
    try {

        const {catogary}=req.body
        if(!catogary){
            res.status(400).json("Invalid input")
        }
        

        const products= await Product.find({catogary:catogary})

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json("Error happened in product-service in filterCatogaryProduct " + error)
        
    }
}



//filer product in name wise
export const filterNameProduct=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            res.status(400).json("Invalid input")
        }else{
            
            const product=await Product.findOne({title:name})

            res.status(200).json(product)
        }
        
    } catch (error) {
        res.status(400).json("Error happened in product-service in filterNameProduct " + error)
        
    }
}



//sort product in price wise
export const sortPriceProduct=async(req,res)=>{
    try {
    
        const {sortMethord}=req.body
       let product
        if(sortMethord=="asending"){
            product=await Product.find().sort({price:1})
        }else if( sortMethord=='desenting'){
            product=await Product.find().sort({price:-1})
        }else{
            res.status(400).json("Inalide inpute")
        }
        

        res.status(200).json(product)
        
    } catch (error) {
        res.status(400).json("Error happened in product-service in sortPriceProduct " + error)
        
    }
}

//show a spcific product
export const aProduct =async(req,res)=>{
    try {

        const {id}=req.body
        const product=await Product.findById(id)
        if(!product){
            res.status(400).json("No product found")
        }else{
            res.status(200).json(product)
        }
        
    } catch (error) {
        res.status(400).json("Error happened in product-service in aProduct " + error)
        
    }
}


//list un list product
export const listUnlistProduct=async(req,res)=>{
    try {

        const {id}=req.body
        const product=await Product.findById(id)
        if(!product){
            res.status(400).json("NO Product find")
        }
        if(product.status==true){
            product.status=false
        }else{
            product.status=true
        }

        await product.save()

        res.status(200).json(product)
        
    } catch (error) {
        res.status(400).json("Error happened in product-service in listUnlistProduct " + error)
        
    }
}



//add to cart
export const addTocart = async (req, res) => {
    try {
        console.log("cart");
        console.log(req.body);
        const { ids } = req.body;
        const user = req.user;

        let products = [];
        for (let i = 0; i < ids.length; i++) {
            console.log(ids[i],"id");
            const product = await Product.findById(ids[i]);
            console.log(product);

            if (product && product.stoke > 0) {
                console.log("pro");
                products.push(product); 
            } else {
                return res.status(400).json(`Product with ID ${ids[i]} is out of stock.`);
            }
        }

        console.log(`-------products ${products}----------`);
        const obj = {
            event: "AddToCart",
            product: products,
            user: user.id
        };

        await serviceToProducer(obj, "product-topic");
        res.status(200).json({ message: "product added to cart ",  });
        
    } catch (error) {
        // Handle errors in the main function
        res.status(500).json(`Error happened in product-service in addTocart: ${error}`);
    }
};
