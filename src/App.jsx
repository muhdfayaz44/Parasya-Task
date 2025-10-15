import { useState } from 'react'
import './App.css'

function App() {

  const [products, setProducts] = useState([])

  
    fetch("https://fake-store-api.mock.beeceptor.com/api/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data) // data is stored in state
    })
    .catch(err => console.error("Error fetching the data", err))

  return (
    <div className ="App">
      <h2>Product Details</h2>

    <div>
      {products.map((item) => (
        <p key={item.product_id}>{item.name} -${item.price}</p>
      ))}
    </div>

    </div>
  )
}

export default App
