import { useEffect, useState } from "react"
import { Fetch } from "../ApiManager"
import { Order } from "./Order"

export const MyOrders = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const [purchases, setPurchases] = useState([])
    const [filteredPurchases, setFilterByUser] = useState([])

    const purchasesExpandProductUserIdURL = `?_expand=product&_expand=user&userId=${kandyUserObject.id}`

    useEffect(() => {
        Fetch("purchases", "")
            .then((purchasesArray) => {
                setPurchases(purchasesArray)
            })
    }, [])
    
    useEffect(() => {
        Fetch("purchases", purchasesExpandProductUserIdURL,)
            .then((filterArrayByUser) => {
                setFilterByUser(filterArrayByUser)
            })
    }, [purchases]
    )

    return <>
        <h2 className="purchases__title">My Orders</h2>
        <article className="purchases">
            {
                filteredPurchases.map((purchase) => <Order
                    currentUser={kandyUserObject}
                    purchaseObject={purchase}
                    key={purchase.id}
                />)
            }
        </article>
    </>
}