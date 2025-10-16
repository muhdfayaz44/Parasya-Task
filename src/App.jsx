import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 

function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
     fetch("https://fake-store-api.mock.beeceptor.com/api/products")
    .then((res) => {
      if(!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json()
    })
    .then((data) => {
      setProducts(data) // data is stored in state
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err)
      setError("Failed to load product data. Please try again later.")
      setLoading(false);
    })
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


  return (
    <div className ="App">
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
      <ToastContainer/>
    </div>
  )
}

export default App
