import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { removeProduct } from "../services/ProductService"

type ProductDetailsProps={
    product:Product
}

export async function action({params}:ActionFunctionArgs){
    console.log(params.id)
    if(params.id!=undefined){
         await removeProduct(+params.id) 
         return redirect('/')
    }
   
   
}

export default function ProductDetails({product}:ProductDetailsProps) {

    const fetcher=useFetcher()
    const navigate=useNavigate()

    const isAvaliable=product.availability
// const handleDelete=async(id:Product['id'])=>{
//     if(confirm("Está seguro de eliminar este producto?")){
//         await removeProduct(id)
//         redirect('/')
//     }
// }
  return (
    <tr className="border-b ">
    <td className="p-3 text-lg text-gray-800">
        {product.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
        {product.price}
    </td> 
    <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method='post'>
            <button
            type='submit'
            name='availability'
            value={product.availability.toString()}
            className={`${isAvaliable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}

            >
                 {isAvaliable ? 'Disponible' : 'No disponible'}
            </button>
            <input type='hidden' name='id' value={product.id}/>
        </fetcher.Form>
       
    </td>
    <td className="p-3 text-lg text-gray-800 ">
       <div className="flex gap-2 items-center">
        
        <button
        onClick={()=>navigate(`/productos/${product.id}/editar`,{
            state:{
                product:product
            }
        })}
        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
        >Editar</button>

        <Form
        className="w-full"
        method='POST'
        action={`productos/${product.id}/eliminar`}
        onSubmit={(e)=>{
            if(!confirm('Eliminar?')){
                e.preventDefault()
            }
        }}
        >
            <input
            type='submit'
            value='Eliminar'
             className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            />
        </Form>
        
       </div>
    </td>
</tr> 
  )
}
