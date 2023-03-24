import {Link, useSearchParams} from 'react-router-dom';

import './ColorNavigation.css'

const listLink = (group, currentGroup) => {
    return (<li className="colorGroupListItem">
        <Link to={`/list?group=${group}`} style={{
            color: currentGroup === group ? group : 'black'
        }}>{group.charAt(0).toUpperCase() + group.slice(1)}</Link>
    </li>);
};

function ColorNavigation() {
    const [searchParams, setSearchParams] = useSearchParams();
    const group = searchParams.get('group');
    return (
        <div className="colorNavigation">
            <div style={{
                marginTop: '30px',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                <button className="button">Random Color</button>
            </div>
            <div style={{
                fontWeight: 'bold'
            }}>
                <ul className="colorGroupList">
                    {listLink('red', group)}
                    {listLink('orange', group)}
                    {listLink('yellow', group)}
                    {listLink('green', group)}
                    {listLink('blue', group)}
                    {listLink('purple', group)}
                    {listLink('brown', group)}
                    {listLink('gray', group)}
                </ul>
            </div>
            {group ? (
                <div style={{
                    marginTop: '10px',
                    marginBottom: '30px',
                    textAlign: 'center'
                }}>
                    <Link to="/list">
                        <button className="button smallButton">Show All Colors</button>
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

export default ColorNavigation;
