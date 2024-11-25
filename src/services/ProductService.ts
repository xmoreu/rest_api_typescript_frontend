import {  safeParse } from "valibot";
import { DraftProductSchema ,Product,ProductSchema, ProductsSchema} from "../types"
import axios from "axios";
import { toBoolean } from "../utils";
type ProductData={
    [k: string]: FormDataEntryValue;
}
export async function addProduct(data:ProductData){
    console.log(data)
    try {
        const result=safeParse(DraftProductSchema,{
            name:data.name,
            price:+data.price
        })
        if(result.success){
            const url=`${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url,{
                name:result.output.name,
                price:result.output.price
            })
        }else{
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }

    //Comprovar que data te un nom i un preu


}
export async function getProducts(){
    try {
        const url=`${import.meta.env.VITE_API_URL}/api/products`
        const {data}=await axios.get(url)
        const result=safeParse(ProductsSchema,data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function  getProductById(id:Product['id']) {
    try {
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data}=await axios.get(url)
       const result=safeParse(ProductSchema,data.data)
       if(result.success){
        return result.output
       }else{
        throw new Error('Hubo un error')
       }
    } catch (error) {
        console.log(error)
    }
    
}

export async function updateProduct(newData:ProductData,id:Product['id']){
   
    try {
       
        
         //const {data}=await axios.put(url,newData)
         
       const result=safeParse(ProductSchema,{
        id,
        name:newData.name,
        price:+newData.price,
        availability: toBoolean(newData.availability.toString())
       })
       if(result.success){
          const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
          await axios.put(url,result.output)
       }
      
    } catch (error) {
        console.log(error)
    }

}
export async function  removeProduct(id:Product['id']) {
    try {
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url
            
        )
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id:Product['id']) {
    try {
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
    
}

