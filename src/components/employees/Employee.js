import { Link } from "react-router-dom"

export const Employee = ({ id, name, email, payRate, locationName}) => {
    return <section className="employee">
        <div><Link className="employee__link" to={`/employees/${id}`}>Name: {name}</Link></div>
        <div>Email: {email}</div>
        <div>Rate: ${payRate}/hour</div>
        <div>Location: {locationName}</div>
    </section>
}