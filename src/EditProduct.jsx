import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const[product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("products"));
        if (saved && saved.length > 0) {
            const singleProduct = saved.find((p) => p.product_id.toString() === id);
            setProduct(singleProduct);
            setLoading(false);
        }
    }, [id])


const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value});
};

const handleSubmit = (e) => {
  e.preventDefault();

  const saved = JSON.parse(localStorage.getItem("products")) || [];
  const updated = saved.map((p) =>
    p.product_id.toString() === id ? product : p
  );

  localStorage.setItem("products", JSON.stringify(updated));
   toast.success("Product details updated successfully!", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
    });
  navigate(`/product/${id}`)
};

if (loading) return <p>Loading...</p>;
if (!product) return <p>Product not found.</p>;

return (
    <div className="editPage" style={{ padding: "2rem" }}>
      <h2>Edit Product: {product.name}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "1rem", maxWidth: "400px", margin: "auto" }}
      >
        <input className="editPage-name" type="text" name="name" value={product.name} onChange={handleChange} />
        <input className="editPage-price" type="number" name="price" value={product.price} onChange={handleChange} />
        <input className="editPage-brand" type="text" name="brand" value={product.brand} onChange={handleChange} />
        <input className="editPage-category" type="text" name="category" value={product.category} onChange={handleChange} />
        <textarea className="editPage-desc" name="description" value={product.description} onChange={handleChange} />
        <input className="editPage-img"
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
        />
        <button className="editPage-submit"
          type="submit"
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;