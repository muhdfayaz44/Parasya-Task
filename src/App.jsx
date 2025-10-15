import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard'

function App() {

  const [products, setProducts] = useState([])

  useEffect(() => {
     fetch("https://fake-store-api.mock.beeceptor.com/api/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data) // data is stored in state
    })
    .catch(err => console.error("Error fetching the data", err))
  },[])
   

  return (
    <div className ="App">
      <h2>Product Details</h2>

    <div className='grid'>
      {products.map((item) => (
        <ProductCard key={item.product_id} product={item}></ProductCard>
      ))}
    </div>

    </div>
  )
}

export default App
