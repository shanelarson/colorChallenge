import {Link, useSearchParams} from 'react-router-dom';

import './ColorNavigation.css'

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
                    <li className="colorGroupListItem">
                        <Link to="/list?group=red" style={{
                            color: group === 'red' ? 'red' : 'black'
                        }}>Red</Link>
                    </li>
                    <li className="colorGroupListItem">
                        <Link to="/list?group=orange" style={{
                            color: group === 'orange' ? 'orange' : 'black'
                        }}>Orange</Link>
                    </li>
                    <li className="colorGroupListItem">
                        <Link to="/list?group=yellow" style={{
                            color: group === 'yellow' ? 'yellow' : 'black'
                        }}>Yellow</Link>
                    </li>
                    <li className="colorGroupListItem">
                        <Link to="/list?group=green" style={{
                            color: group === 'green' ? 'green' : 'black'
                        }}>Green</Link>
                    </li>
                    <li className="colorGroupListItem">
                        <Link to="/list?group=blue" style={{
                            color: group === 'blue' ? 'blue' : 'black'
                        }}>Blue</Link>
                    </li>
                    <li className="colorGroupListItem">
                        <Link to="/list?group=purple" style={{
                            color: group === 'purple' ? 'purple' : 'black'
                        }}>Purple</Link>
                    </li>
                    <li className="colorGroupListItem">
                        <Link to="/list?group=brown" style={{
                            color: group === 'brown' ? 'brown' : 'black'
                        }}>Brown</Link>
                    </li>
                    <li className="colorGroupListItem">
                        <Link to="/list?group=gray" style={{
                            color: group === 'gray' ? 'gray' : 'black'
                        }}>Gray</Link>
                    </li>
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
