import { Link } from "react-router-dom";

export const Customer = ({ id, fullName, email }) => (
    <section className="customer">
        <div><Link className="customer__link" to={`/customers/${id}`}>Name: {fullName}</Link></div>
        <div>Email: {email}</div>
    </section>
)