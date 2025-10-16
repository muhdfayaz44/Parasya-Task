function ProductCard({ product, handleAddtoCart}) {
    return (
        <div className="card">
            <img className="card-image" src={product.image} alt={"Error loading image"}
            />
            <div className="card-body">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="desc">{product.description}</p>
                <div className="cart">
                     <button
                      className="btn" 
                      onClick={() => handleAddtoCart(product)}>
                        Add to Cart
                     </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard