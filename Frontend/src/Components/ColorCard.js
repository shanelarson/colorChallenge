import './ColorCard.css'
import {Link} from "react-router-dom";

function ColorCard(props) {
    const styles = {};
    if (props.width) {
        styles.width = props.width;
    }
    if (props.height) {
        styles.height = props.height;
    }
    if (props.border) {
        styles.border = "1px solid #000000";
        styles.boxShadow = "none";
    }
    const colorContent = (
        <div style={{
            height: '100%'
        }}>
            <div style={{
                width: '100%',
                height: 'calc(100% - 38px)',
                backgroundColor: props.color.hex,
                borderRadius: '5px'
            }}></div>
            <div style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '8px',
                height: '20px',
            }}>
                {props.color.hex}
            </div>
        </div>
    );
    return (
        <div className="colorCard" style={styles}>
            {props.details ? (<Link to={`/detail?id=${props.color.id}`}>
                {colorContent}
            </Link>) : colorContent}
        </div>
    );
}

export default ColorCard;
