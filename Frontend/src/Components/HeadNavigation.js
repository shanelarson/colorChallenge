import './HeadNavigation.css'
import logo from './../assets/graphics/logo.svg';
import {Link} from "react-router-dom";

function HeadNavigation() {
    return (
        <div className="bar">
            <div className="barSection">
                <div className="logoWrap">
                    <Link to="/">
                        <img className="logo" src={logo} alt="logo" />
                    </Link>
                </div>
            </div>
            <div className="barSection" style={{
                flex: 1
            }} />
            <div className="barSection">
                <div className="searchWrap">
                    <input className="searchInput" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    );
}

export default HeadNavigation;
