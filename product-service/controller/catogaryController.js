 import {Catogary} from '../model/catogaryModel.js'




 //test
 export const fisrtRequest=async(req,res)=>{
    try {
        res.status(200).json('SUcesss')
        
    } catch (error) {
     res.status(400).json("Error happence in product-service in catogary controlller in fistreqest " + error)
    }
}


//create catogary
export const createCatogary=async(req,res)=>{
    try {
        const {name,description}=req.body
        const catogaryExist=await Catogary.findOne({name})

        if(catogaryExist){
            res.status(400).json("Catogary already exist")
        }else{


            const catogary=new Catogary({
                name,
                description
            })

            await catogary.save()

            res.status(200).json(catogary)
        }
        
    } catch (error) {
     res.status(400).json("Error happence in product-service in catogary controlller in createCatogary " + error)
        
    }
}


// edit catogary

export const editCatogary=async(req,res)=>{
    try {
        
        const {name,description,id}=req.body
        const catogary=await Catogary.findByIdAndUpdate(id,{
            name:name,
            description:description
        },{new:true})

    if(!catogary){
        res.status(400).json('Invalid id')
    }else{
        res.status(200).json(catogary)
    }
    } catch (error) {
     res.status(400).json("Error happence in product-service in catogary controlller in editCatogary " + error)
        
    }
}





//show all catogary
export const getAllcatogary=async(req,res)=>{
    try {
        const catogary=await Catogary.find()
        if(catogary){
            res.status(200).json(catogary)
        }else{
            res.status(400).json("Categories Not Found")
        }
        
    } catch (error) {
     res.status(400).json("Error happence in product-service in catogary controlller in getAllcatogary " + error)
        
    }
}
    
    
    

//list unlist catogary
export const listUnistCat=async (req,res)=>{
    try {
        const {id} = req.body
   
        const catogary=await Catogary.findById(id)
       
        if(!catogary){
            res.status(400).json('Invalid id')
        }
        if(catogary.status==true){
            catogary.status=false
        }else{
            catogary.status=true
        }

        await catogary.save()

        res.status(200).json(catogary)
        
    } catch (error) {
     res.status(400).json("Error happence in product-service in catogary controlller in listUnistCat " + error)
        
    }
}