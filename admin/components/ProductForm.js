import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images:existingImage,
  }) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [images , setImages] = useState(existingImage || []);
    const [price, setPrice] = useState(existingPrice !== undefined ? existingPrice : "");
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(ev) {
      ev.preventDefault();
      const data = { title, description, price , images};
      if(_id) {
        await axios.put('/api/products',{...data,_id});
      } else {
      await axios.post('/api/products', data);
      }
      setGoToProducts(true);
    }
  
    if (goToProducts) {
      router.push('/products');
    }
  
    async function uploadImages(ev) {
      const files = ev.target?.files;
      if (files?.length > 0) {
        const data = new FormData();
        for (const file of files) {
          data.append('file', file);
        }
          const res = await axios.post('/api/upload', data);
          setImages(oldImages => {
            return [...oldImages, ...res.data.links];
          });
      }
    }
    return (
      <form onSubmit={saveProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>
          Photo
        </label>
        <div className="mb-4 flex flex-wrap gap-2">
          {!!images?.length && images.map(link => (
            <div key={link} className="inline-block h-24">
              <img src={link} alt=""className="rounded-md"/>
              {link}
            </div>
          ))}
          <label className="w-24 h-24 cursor-pointer border text-center flex items-center justify-center text-sm gap-1 text-grey-700 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <div>
              Upload
            </div>
            <input type="file" onChange={uploadImages} className="hidden"/>
          </label>
          {!images?.length && (
            <div>No photos in this product</div>
          )}
        </div>
        <label className="mt-2"> Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <label>Price (in ₹)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(Number(ev.target.value))}
        />
        <button type="submit" className="bg-green-900 text-white px-4 py-1 rounded-md">
          Save
        </button>
      </form>
    );
  }