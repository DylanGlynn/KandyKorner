import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fetch, fetchAllPurchases, Method } from "../ApiManager";
import "./Products.css"

export const ProductsList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [filteredProductsByPrice, productsFilteredByPrice] = useState(false)
    //    const [filteredProductsBySearch, setFilteredBySearch] = useState(false)
    const navigate = useNavigate()

    const localKandyuser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyuser)

    const productSortExpandProductTypeURL = `?_sort=name&_expand=productType`

    useEffect(
        () => {
            const searchedProducts = products.filter(product => (
                product.name.toLowerCase().includes(searchTermState.toLowerCase())))
            setFiltered(searchedProducts)
        }, [searchTermState])

    useEffect(
        () => {
            Fetch("products", productSortExpandProductTypeURL,)
                .then((productsArray) => { setProducts(productsArray) })
        }, [])

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
    
    const purchaseCandy = (product) => {
        const copy = {
            userId: kandyUserObject.id,
            productId: parseInt(product.id),
            dateCompleted: new Date()
        }

        return Fetch("purchases", "", Method("POST", copy))
            .then(() => { navigate("/products") })
    }

    const purchaseButton = (product) => {
        if (!kandyUserObject.staff) {
            return <button onClick={
                (evt) => {
                    const copy = { ...product }
                    copy.id = evt.target.value
                    purchaseCandy(copy)
                }}
                className="purchase__button"
                value={product.id}><b>Purchase</b></button>
        } else {
            return ""
        }

    }

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
                        <article className="product__details" key={`product--${product.id}`}>
                            <div className="product__purchase">
                                {
                                    purchaseButton(product)
                                }
                            </div>
                            <section className="product"  >
                                <header><b>{product.name}</b></header>
                                <article>Now only ${product.price}!</article>
                                {searchTermState
                                    ? ""
                                    : <article>In the {product.productType.name} family.</article>
                                }
                            </section>
                        </article>
                    )
                )
            }
        </article>
    </>
}