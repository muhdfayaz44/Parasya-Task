import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

function ProductDetails() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const{ id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const saved = JSON.parse(localStorage.getItem("products"));
        if(saved && saved.length > 0) {
            const singleProduct = saved.find((p) => p.product_id.toString() === id);
            setProduct(singleProduct);
            setLoading(false);
        } else {
        fetch("https://fake-store-api.mock.beeceptor.com/api/products")
        .then((res) => {
            if(!res.ok) throw new Error("Failed to fetch products");
            return res.json();
        })
        .then((data) => {
            //Here we match the given id to filter the array
            const singleProduct = data.find((p) => p.product_id.toString() === id);
            if(!singleProduct) throw new Error("Product not found");
            setProduct(singleProduct);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        })
    }
    }, [id]);

    if (loading) return <p>Loading the product details</p>
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="details" style={{padding: "2rem"}}>
            <h2>{product.name}</h2>
            <img className="prev-image" src={product.image} alt = {product.name}   style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                borderRadius: "10px",
                display: "block",
                margin: "1rem auto"
            }}></img>
            <p>{product.description}</p>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Brand:</b> {product.brand}</p>
            <p><b>Category:</b> {product.category}</p>
            <p><b>Discount:</b> {product.discount}%</p>
            <p><b>Availability:</b> { product.availability? "InStock" : "OutofStock" }</p>
            <p><b>Rating:</b> { product.rating }</p>
            {product.reviews && product.reviews.length > 0 && (
                <div>
                    <h4>Reviews:</h4>
                        {product.reviews.map((r) => (
                            <li key={r.user_id}>
                                <p>User-ID: {r.user_id}</p>{r.rating}{` Star Rating`} - {r.comment}
                            </li>
                        ))}
                </div>
            )}
            <Link to={`/product/${product.product_id}/edit`}>
                <button 
                     style={{
                        fontFamily: "Poppins",
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "1rem",
                        }}
                >EDIT</button>
            </Link>
    
            <button
                onClick={() => navigate("/")}
                style={{
                    marginLeft: "10px",
                    fontFamily: "Poppins",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginTop: "1rem",
                }}
            >Back</button>
        </div>
    )
}
export default ProductDetails;