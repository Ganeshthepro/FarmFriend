import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage(){
    const router = useRouter(); 
    const [productInfo, setProductInfo] = useState();
    const {id} = router.query;
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/products?id=').then(response => {
            setProductInfo(response.data);
        });
    }, [id]);
    function goBack() {
        router.push('/products');
    }
    async function deleteProduct(){
      await axios.delete('/api/products?id='+id);
      goBack();
    }
    return (
        <Layout>
           <h1 className="text-center"> Confirm Delete??</h1>
           <div className="flex gap-2 justify-center">
            <button className="bg-red-800 text-white rounded-md px-4 py-1 mr-1" onClick={deleteProduct}>Yes</button>
            <button className="bg-green-800 text-white rounded-md px-4 py-1" onClick={goBack}>No</button>
            </div>
        </Layout>
    );
}