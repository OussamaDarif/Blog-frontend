import { Outlet } from "react-router-dom"
import Navbar from "./navbar.component"

export function Layout () {
    return (
        <div>
            <Navbar />
            <div className="container">
              <Outlet/>
            </div>
        </div>
    )
}