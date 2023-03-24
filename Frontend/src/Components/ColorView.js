import './ColorView.css'
import {Outlet} from 'react-router-dom';
import ColorNavigation from "./ColorNavigation";

function ColorView() {
    return (
        <div className="colorView">
            <ColorNavigation />
            <div style={{
                flex: 1,
            }}>
                <Outlet />
            </div>
        </div>
    );
}

export default ColorView;
