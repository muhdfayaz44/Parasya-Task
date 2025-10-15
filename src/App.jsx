import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard'

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
   

  return (
    <div className ="App">
      <h2>Product Details</h2>

      {loading && <p>Loading Products...</p>}
      {error && <p className='error'>Error: {error}</p>}


      {!loading && !error && (
        <div className='grid'>
          {products.map((item) => (
            <ProductCard key={item.product_id} product={item}></ProductCard>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
