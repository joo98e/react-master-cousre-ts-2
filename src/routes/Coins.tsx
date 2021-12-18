import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../Api/api";
import { Content, TextContent, Header, Title, Wrapper } from "../Assets/UIComponents";

interface Props {

}

const CoinList = styled(Content)`
    li{
       text-align : center;
    }
`;

const CoinComponent = styled(TextContent)`
    max-width : 480px;
    margin : 20px auto;
    padding : 20px;
    border-radius: 15px;
    a{
        display: flex;
        align-items: center;
        transition: color 0.2s linear;
        padding: 20px;
    }
    &:hover{
        color : ${props => props.theme.accentColor}
    }
`;

const Loader = styled.p`
    text-align:center;
`;

const Img = styled.img`
    width : 35px;
    height: 35px;
    margin-right : 10px;
`;

interface CoinInterface {
    "id": string,
    "name": string,
    "symbol": string,
    "rank": number,
    "is_new": boolean,
    "is_active": boolean,
    "type": string
}

const Coins = (props: Props) => {
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     (async () => {

    //         setCoins(json.slice(0, 10));
    //         setLoading(false);

    //     })();
    // }, []);

    const { isLoading, data } = useQuery<CoinInterface[]>("allTheCoins", fetchCoins);

    return (
        <Wrapper>
            <Helmet>
                <title>All the Coin</title>
            </Helmet>
            <Header>
                <Title>All the Coin</Title>
            </Header>
            <CoinList as="ul">
                {
                    isLoading ?
                        <Loader>
                            Loading...
                        </Loader>
                        :
                        data?.slice(0, 10).map((item, index) => {
                            return (
                                <CoinComponent key={item.id} as="li">
                                    <Link to={{
                                        pathname: `/${item.id}/chart`,
                                        state: {
                                            name: item.name
                                        }
                                    }}>
                                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`} alt={item.symbol} />
                                        {item.name} &rarr;
                                    </Link>
                                </CoinComponent>
                            )
                        })
                }
            </CoinList>
        </Wrapper>
    )
}

export default Coins
