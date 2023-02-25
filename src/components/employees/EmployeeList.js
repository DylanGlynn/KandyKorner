import { useEffect, useState } from "react"
import { Employee } from "./Employee";
import "./Employees.css";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    return <>
        <h2 className="employees__title">Employees</h2>
        <article className="employees">
            {
                employees.map(employee => <Employee
                    key={`employee--${employee.id}`}
                    id={employee?.user?.id}
                    fullName={employee?.user?.fullName}
                    email={employee?.user?.email}
                    payRate={employee.payRate}
                    locationName={employee?.location?.name} />
                )
            }
        </article>
    </>
}