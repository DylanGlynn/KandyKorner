import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"
import { MyOrders } from "../products/MyOrders.js"
import { ProductContainer } from "../products/ProductContainer.js"

export const CustomerViews = () => {
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
                <Route path="products" element={<ProductContainer />} />
                <Route path="orders" element={<MyOrders />} />
            </Route>
        </Routes>
    )
}

