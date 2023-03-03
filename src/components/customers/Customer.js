import { Link } from "react-router-dom";

export const Customer = ({ id, fullName, email, purchaseCount }) => (
    <section className="customer">
        <article className="customer__info">
            <div><Link className="customer__link" to={`/customers/${id}`}>Name: {fullName}</Link></div>
            <div>Email: {email}</div>
        </article>
        <article className="customer__purchaseCount">
            <div><em>Orders</em></div>
            <div>{purchaseCount}</div>
        </article>
    </section>
)