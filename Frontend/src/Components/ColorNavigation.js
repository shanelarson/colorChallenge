import {Link, useSearchParams, useNavigate} from 'react-router-dom';

import './ColorNavigation.css'
import {gql, useLazyQuery} from "@apollo/client";
import {useEffect} from "react";

const GET_RANDOM_COLOR = gql`
  query randomColor {
    randomColor {
         id
         hue
         hex
         group
    }
  }
`;

const listLink = (group, currentGroup) => {
    return (<li className="colorGroupListItem">
        <Link to={`/list?group=${group}`} style={{
            color: currentGroup === group ? group : 'black'
        }}>{group.charAt(0).toUpperCase() + group.slice(1)}</Link>
    </li>);
};

function ColorNavigation() {
    const [getRandomColor, { loading, error, data }] = useLazyQuery(GET_RANDOM_COLOR, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
    });
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const group = searchParams.get('group');
    useEffect(() => {
        if (data && data.randomColor.id) {
            const id = data.randomColor.id;
            navigate(`/detail?id=${id}`);
        }
    }, [data]);
    return (
        <div className="colorNavigation">
            <div style={{
                marginTop: '30px',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                <button className="button" onClick={() => {
                    if (!loading) {
                        getRandomColor();
                    }
                }}>Random Color</button>
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
