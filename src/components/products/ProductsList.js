import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css"

export const ProductsList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [filteredProductsByPrice, productsFilteredByPrice] = useState(false)
//    const [filteredProductsBySearch, setFilteredBySearch] = useState(false)
    const navigate = useNavigate()

    const localKandyuser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyuser)

    useEffect(
        () => {
            const searchedProducts = products.filter(product => (
                product.name.toLowerCase().startsWith(searchTermState.toLowerCase())))
            setFiltered(searchedProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
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
            const productListSortAlphabetical = productListAlphabetical.sort(function (a, b) {
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
                    <button onClick={() => productsFilteredByPrice(true)}>Top Priced</button>
                    <button onClick={() => productsFilteredByPrice(false)}>Show All</button>
                </>
                : ""
        }

        <article className="products">
            {
                filteredProducts.map(
                    (product) => (
                        <section className="product" key={`product--${product.id}`} >
                            <header><b>{product.name}</b></header>
                            <article>Now only ${product.price}!</article>
                            {searchTermState
                                ? ""
                                : <footer>In the {product.productType.name} family.</footer>
                            }
                        </section>
                    )
                ).sort()
            }
        </article>
    </>
}