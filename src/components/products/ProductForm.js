import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    const [newProduct, createProduct] = useState({
        name: "",
        price: "",
        productTypeId: ""
    })

    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandu_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: newProduct.name,
            price: parseFloat(newProduct.price),
            productTypeId: parseInt(newProduct.productTypeId)
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name of the product (i.e. Reese's Pieces)"
                        value={newProduct.name}
                        onChange={
                            (eve) => {
                                const copy = { ...newProduct }
                                copy.name = eve.target.value
                                createProduct(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="$"
                        value={newProduct.price}
                        onChange={(eve) => {
                            const copy = { ...newProduct }
                            copy.price = eve.target.value
                            createProduct(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productTypeId">Product Type:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Need dropdown"
                        value={newProduct.productTypeId}
                        onChange={(eve) => {
                            const copy = { ...newProduct }
                            copy.productTypeId = eve.target.value
                            createProduct(copy)
                        }} />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">Add</button>
        </form>
    )
}