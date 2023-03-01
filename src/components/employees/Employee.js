import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Fetch, Method } from "../ApiManager"

export const Employee = ({ id, fullName, email, payRate, locationName, setToggle }) => {
    const terminationButton = (id) => {
        const userURL = `/${id}`
    
        return <button className="employee__fire"
            value={id}
            onClick={() => {
                Fetch("users", userURL, Method("DELETE",))
                    .then(setToggle((value)=> !value))
            }}>Fire Employee</button>
    }

    return <section className="employee">
        <div><Link className="employee__link" to={`/employees/${id}`}>Name: {fullName}</Link></div>
        <div>Email: {email}</div>
        <div>Rate: ${payRate}/hour</div>
        <div>Location: {locationName}</div>
        <footer>{terminationButton(id)}</footer>
    </section>
}