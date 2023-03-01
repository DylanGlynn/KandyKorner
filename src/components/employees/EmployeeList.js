import { useEffect, useState } from "react"
import { Fetch } from "../ApiManager";
import { Employee } from "./Employee";
import "./Employees.css";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [Toggle, setToggle] = useState(false)
    const employeesExpandLocationURL = `?_expand=user&_expand=location`

    useEffect(
        () => {
            Fetch("employees", employeesExpandLocationURL,)
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        }, [Toggle])

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
                    locationName={employee?.location?.name}
                    setToggle={setToggle} />
                )
            }
        </article>
    </>
}