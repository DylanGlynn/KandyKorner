import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Fetch, Method } from "../ApiManager"

export const CustomerDetails = () => {
    const { customerId } = useParams()

    const [customer, updateCustomer] = useState([])
    const [loyalty, updateLoyalty] = useState({ loyaltyNumber: "" })
    const [feedback, setFeedback] = useState("")

    const customerUserIdURL = `?_expand=user&userId=${customerId}`
    const customerIdURL = `/${customer.id}`

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(() => {
        Fetch("customers", customerUserIdURL,)
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return Fetch("customer", customerIdURL, Method("PATCH", loyalty))
            .then(() => { setFeedback("Customer Loyalty Number successfully saved") })
    }

    return (
        <form className="customer__details">
            <header className="customer__header">Name: {customer.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <article className="loyalty__update">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="loyaltyNumber">Loyalty Number:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder={customer.loyaltyNumber}
                            value={loyalty.loyaltyNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...loyalty }
                                    copy.loyaltyNumber = parseInt(evt.target.value)
                                    updateLoyalty(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary btn-loyalty">Update</button>
                <div className={`${feedback.includes("Error") ? "error" : "feedback"} 
            ${feedback === "" ? "invisible" : "visible"}`}>
                    {feedback}
                </div>
            </article>
        </form>
    )
}