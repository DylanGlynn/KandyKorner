import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css"

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [filteredProductsByPrice, productsFilteredbyPrice] = useState(false)
    const navigate = useNavigate()

    const localKandyuser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyuser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const productListAlphabetical = products.filter(product => product.name)
            const productListSortAlphabetical = productListAlphabetical.sort(function (a ,b) {
                if (a.name < b.name) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1
                }
            })
                setFiltered(productListSortAlphabetical)
            },
        [products]
    )

    useEffect(
        () => {
            if (filteredProductsByPrice) {
                const productListByPrice = products.filter(product => product.price > 2.00)
                const productsSortByHighestPrice = productListByPrice.sort(function (a, b) {
                    if (a.price < b.price) {
                        return 1
                    }
                    if (a.price > b.price) {
                        return -1
                    }
                    return 0;
                })
                setFiltered(productsSortByHighestPrice)
            } else {
                setFiltered(products)
            }
        },
        [filteredProductsByPrice]
    )

    return <>
        <h2 className="products__title">List of Products</h2>
        {
            kandyUserObject.staff
                ? <>
                    <button onClick={() => productsFilteredbyPrice(true)}>Top Priced</button>
                    <button onClick={() => productsFilteredbyPrice(false)}>Show All</button>
                </>
                : ""
        }


        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={product.id} >
                            <header><b>{product.name}</b></header>
                            <article>Now only ${product.price}!</article>
                            <footer>In the {product.productType.name} family.</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}