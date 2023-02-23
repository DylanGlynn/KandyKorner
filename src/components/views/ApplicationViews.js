import { EmployeeViews } from "./EmployeeViews.js"
import { CustomerViews } from "./CustomerViews.js"

export const ApplicationViews = () => {
    let localKandyuser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyuser)

	if (kandyUserObject.staff) {
		return <EmployeeViews />
    } else {
        // return customer view
        return <CustomerViews />
    }
}

