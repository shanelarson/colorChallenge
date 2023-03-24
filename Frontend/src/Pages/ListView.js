import './ListView.css'
import ColorCard from "../Components/ColorCard";
import { useQuery, gql } from '@apollo/client';
import {Link, useSearchParams} from "react-router-dom";

const GET_COLORS = gql`
  query Colors($group: String, $page: Int) {
    colors {
        count(group: $group)
        colors(group: $group, page: $page) {
            id
            hue
            hex
            group
        }
    }
  }
`;

function ListView(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, error, data } = useQuery(GET_COLORS, {
        variables: {
            group: searchParams.get('group'),
            page: parseInt(searchParams.get('page'))
        },
    });
    if (loading) {
        return (
            <div>Loading</div>
        );
    }
    const pages = [];
    const pageCount = Math.ceil(data.colors.count / 12);
    for(let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    const group = searchParams.get('group');
    return (
        <div className="listView">
            <div style={{
                flex: 1,
                height: 'calc(100vh - 100px - 100px)',
                padding: '30px 20px 20px 20px',
            }}>
                {[0,4,8].map((val, i) => {
                    return (<div key={`colorRow${i}`} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        padding: '20px',
                        height: '25%'
                    }}>
                            {data.colors.colors.slice(val, val + 4).map((color, i) => {
                                return (<ColorCard key={`color${i}`} color={color} details={true} />);
                            })}
                    </div>
                    );
                })}
            </div>
            <div style={{
                display: 'flex',
                height: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold'
            }}>
                {pages.map(page => {
                    let to = `/list?page=${page}`;
                    if (group) {
                        to = `?group=${group}&page=${page}`;
                    }
                    return (
                        <Link to={to}>
                            <span><span style={{
                                textDecoration: page === parseInt(searchParams.get('page')) ? 'underline' : 'none'
                            }}>{page}</span>&nbsp;&nbsp;</span>
                        </Link>);
                })}
            </div>
        </div>
    );
}

export default ListView;
