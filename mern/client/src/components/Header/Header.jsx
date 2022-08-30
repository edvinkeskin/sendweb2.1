import './Header.css'
import {Outlet, Link} from "react-router-dom";

export default function Header() {

    return (
        <div className="Header">
            <div className="ButtonSet">
                <Link to="/signup">
                    <button className="HeaderButton">Sign Up</button>
                </Link>

                <Link to="/login">
                    <button className="HeaderButton">Login</button>
                </Link>
                <Outlet/>

            </div>

        </div>
    );
}