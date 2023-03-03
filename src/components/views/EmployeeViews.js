import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"
import { ProductsList } from "../products/ProductsList.js"
import { ProductForm } from "../products/ProductForm.js"
import { EmployeeForm } from "../employees/EmployeeForm.js"
import { EmployeeList } from "../employees/EmployeeList.js"
import { CustomerList } from "../customers/CustomerList.js"
import { CustomerDetails } from "../customers/CustomerDetails.js"
import { EmployeeDetails } from "../employees/EmployeeDetails.js"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div className="tagline">Feed Your Candy Addiction, You Little Monsters!</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationsList />} />
				<Route path="products" element={<ProductsList />} />
				<Route path="newproductform" element={<ProductForm />} />
				<Route path="employeeform" element={<EmployeeForm />} />
				<Route path="employees" element={<EmployeeList />} />
				<Route path="employees/:employeeId" element={<EmployeeDetails />} />
				<Route path="customers" element={<CustomerList />} />
				<Route path="users/:userId" element={<CustomerList />} />
				<Route path="customers/:customerId" element={<CustomerDetails />} />
			</Route>
		</Routes>
	)
}

