import { EmployeeNav } from "./EmployeeNav.js"
import { CustomerNav } from "./CustomerNav.js"
import "./NavBar.css"

export const NavBar = () => {
    let localKandyuser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyuser)

    if (kandyUserObject.staff) {
        return <EmployeeNav />
    } else {
        // return customer view
        return <CustomerNav />
    }
}
