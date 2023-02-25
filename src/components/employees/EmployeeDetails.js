import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const [employee, updateEmployee] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location&userId=${employeeId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })
        },
        [employeeId]
    )

    return <section className="employee">
        <header className="employee__header">Name: {employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Location: {employee?.location?.name}</div>
        <div>Rate: ${employee?.payRate?.toFixed(2)}</div>
        <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} {employee?.employeeTickets?.length === 1 ? `ticket` : `tickets`}.</footer>
    </section>
}