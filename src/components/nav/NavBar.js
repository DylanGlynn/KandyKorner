import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    let localKandyuser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyuser)
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/products">Products</Link>
            </li>
            {kandyUserObject.staff
                ?
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/newproductform">Add New Product</Link>
                </li>
                : ""
            }
            {
                <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("kandy_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </li>
            }
        </ul>
    )
}