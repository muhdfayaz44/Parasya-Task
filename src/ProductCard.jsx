function ProductCard({ product }) {
    return (
        <div className="card">
            <img className="card-image" src={product.image} alt={product.name}/>
            <div className="card-body">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="desc">{product.description}</p>
            </div>
        </div>
    )
}

export default ProductCard