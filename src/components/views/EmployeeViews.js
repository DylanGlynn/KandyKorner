import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"
import { ProductsList } from "../products/ProductsList.js"
import { ProductForm } from "../products/ProductForm.js"

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

				<Route path="locations" element={ <LocationsList /> } />
				<Route path="products" element={ <ProductsList /> } />
				<Route path="newproductform" element= { <ProductForm />} />
			</Route>
		</Routes>
	)
}

