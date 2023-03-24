import './DetailView.css'
import ColorCard from "../Components/ColorCard";
import { useQuery, gql } from '@apollo/client';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import KolorWheel from "kolorwheel";

const GET_COLOR = gql`
  query Color($id: String) {
    color(id: $id) {
        hex
        hue
    }
  }
`;

function DetailView(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, error, data } = useQuery(GET_COLOR, {
        variables: {
            id: searchParams.get('id'),
        },
    });
    if (loading) {
        return (
            <div>Loading</div>
        );
    }
    const shades = [];
    for(let i = 5; i > 0; i--){
        const sat = (((i * 2) / 10) * 100) + 10;
        const generatedColor = new KolorWheel([data.color.hue, sat, 50]);
        const hex = generatedColor.getHex();
        const shade = (
            <ColorCard color={{
                hex
            }} width="15%" />
        );
        shades.push(shade);
    }
    return (
        <div className="detailView">
            <div style={{
                display: 'flex',
                width: 'calc(100% - 40px)',
                height: '50%',
                padding: '30px 20px 20px 20px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ColorCard color={{
                    hex: data.color.hex
                }} height="100%" width="95%" border={true} />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '20%'
            }}>
                <div style={{
                    width: 'calc(95% - 40px)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {shades}
                </div>
            </div>
            <div style={{
                marginTop: '5%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <button className="button smallButton" onClick={() => {
                    navigate(-1);
                }}>Clear</button>
            </div>
        </div>
    );
}

export default DetailView;
