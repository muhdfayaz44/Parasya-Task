import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard'
import ProductDetails from './ProductDetails';
import EditProduct from './EditProduct';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("products"));


    if (saved && saved.length > 0) {
      setProducts(saved);
      setLoading(false);
    } else {
     fetch("https://fake-store-api.mock.beeceptor.com/api/products")
    .then((res) => {
      if(!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json()
    })
    .then((data) => {
      setProducts(data) // data is stored in state
      localStorage.setItem("products", JSON.stringify(data));
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err)
      setError("Failed to load product data. Please try again later.")
      setLoading(false);
    })
  }
  },[])
   
const handleAddtoCart = (product) => {
  toast.success(`${product.name} added to cart!`, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
  })
}

function HomePage() {
    return (
      <div className="App">
        <h1 className='heading'>Product Details</h1>

        {loading && <p>Loading Products...</p>}
        {error && <p className='error'>Error: {error}</p>}

        {!loading && !error && (
          <div className='grid'>
            {products.map((item) => (
              <ProductCard
                key={item.product_id}
                product={item}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        )}
        <ToastContainer />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/:id/edit" element={<EditProduct />}/>
      </Routes>
    </Router>
  )

}

export default App
