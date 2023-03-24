import {Outlet} from "react-router-dom";
import HeadNavigation from "../Components/HeadNavigation";

function Root() {
    return (
        <div>
            <HeadNavigation />
            <Outlet />
        </div>
    );
}

export default Root;
