import { useEffect, useState } from "react"
import { Fetch } from "../ApiManager";
import { Customer } from "./Customer";
import "./Customers.css";

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [purchasesFiltered, setFilteredPurchases] = useState([])
    const customerExpandUserURL = `?_expand=user&_embed=purchases`
    
    useEffect(
        () => {
            Fetch("customers", customerExpandUserURL,)
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        },
        []
        )

    return <>
        <h2 className="customers__title">Customers</h2>
        <article className="customers">
            {
                customers.map(customer => <Customer
                    key={`customer--${customer.userId}`}
                    id={customer?.userId}
                    fullName={customer?.user?.fullName}
                    address={customer?.address}
                    phoneNumber={customer?.phoneNumber}
                    email={customer?.user?.email}
                    purchaseCount={customer?.purchases?.length} />
                )
            }
        </article>
    </>
}