import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {
    const [users, setUsers] = useState([])
    const [locations, setLocations] = useState([])
    const [applicant, submission] = useState({
        fullName: "",
        email: "",
        location: 0,
        startDate: Date().toString(),
        payRate: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((userArray) => {
                    setLocations(userArray)
                })
        },
        []
    )

    const handleApplicantClickEmployee = (event) => {
        event.preventDefault()

        const applicantInfoToSendToAPI = {
            userId: users.length + 1,
            startDate: applicant.startDate,
            payRate: parseFloat(applicant.payRate),
            locationId: parseInt(applicant.location)
        }

        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(applicantInfoToSendToAPI)
        })
            .then(response => response.json())
            .then(() => { navigate("/employees") })
    }

    const handleApplicantClickUser = (event) => {
        event.preventDefault()
        const userInfoToSendToAPI = {
            fullName: applicant.name,
            email: applicant.email,
            isStaff: true
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfoToSendToAPI)
        })

    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullName">Employee's Full Name:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        value={applicant.fullName}
                        onChange={(evt) => {
                            const copy = { ...applicant }
                            copy.name = evt.target.value
                            submission(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="czar@kandykorner.biz"
                        value={applicant.email}
                        onChange={
                            (evt) => {
                                const copy = { ...applicant }
                                copy.email = evt.target.value
                                submission(copy)
                            }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay rate:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="$$$"
                        value={applicant.payRate}
                        onChange={(evt) => {
                            const copy = { ...applicant }
                            copy.payRate = evt.target.value
                            submission(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location:</label>
                    <select
                        required
                        className="form-control"
                        value={applicant.location}
                        onChange={(evt) => {
                            const copy = { ...applicant }
                            copy.location = evt.target.value
                            submission(copy)
                        }}>
                        <option value="">Select location...</option>
                        {locations.map(location => (
                            <option value={location.id} key={`location--${location.id}`}>{location.name}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) =>
                    handleApplicantClickUser(clickEvent)
                        .then(() => handleApplicantClickEmployee(clickEvent))}
                className="btn btn-primary">Add Employee</button>
        </form >
    )
}