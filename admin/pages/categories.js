import Layout from "@/components/layout";
import axios from "axios";
import { useState } from "react";

export default function CategoriesPage() {
  const [name, setName] = useState('');

  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post('/api/categories', {name});
    setName('');
    console.log('Success');
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category Name</label>
      <form onSubmit={saveCategory} className="flex">
        <input type="text" placeholder="category name" className="mb-0" onChange={ev => setName(ev.target.value)} value={name} />
        <button type={'submit'} className="bg-green-900 text-white px-3 py-1 ml-1 rounded-md">Save</button>
      </form>
    </Layout>
  );
}