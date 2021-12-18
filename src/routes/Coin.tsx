import React, { useEffect, useState } from 'react'
import { Switch, Route, useLocation, useParams, useRouteMatch, useHistory } from 'react-router'
import styled from 'styled-components';
import { Button, Content, Header, MyLoader, Title, Wrapper } from '../Assets/UIComponents';
import Loader from "react-loader-spinner"
import { Price } from './Price';
import { Chart } from './Chart';
import { Link } from 'react-router-dom';
import { fetchCoinInfo, fetchCoinTickers } from '../Api/api';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet'
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from './Atoms';

interface Props {

}

interface ParamsInterface {
    coinId: string
}

interface LocationInterface {
    name: string
}

interface ITag {

}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    contracts: object;
    parent: object;
    tags: ITag[];
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface ITickersData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

interface ITag {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}

const Overview = styled.div`
   display: flex;
   justify-content: space-between;
   background-color: ${props => props.theme.bgSecondaryColor};
   padding: 10px 20px;
   border-radius: 10px;
 `;

const OverviewItem = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   span:first-child {
     font-size: 10px;
     font-weight: 400;
     text-transform: uppercase;
     margin-bottom: 5px;
   }
 `;

const Description = styled.p`
   margin: 20px 0px;
 `;

const Tabs = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   margin: 25px 0px;
   gap: 10px;
 `;

const Tab = styled.span<{ isActive: boolean }>`
   text-align: center;
   text-transform: uppercase;
   font-size: 12px;
   font-weight: 400;
   background-color: ${props => props.theme.bgSecondaryColor};
   padding: 7px 0px;
   border-radius: 10px;
   color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
   a {
     display: block;
   }
 `;

const ThemeChangeButton = styled(Button)`
    margin-left: auto;
`;

const BackButton = styled(Button)`
    margin-left: auto;
 `;

const Coin = (props: Props) => {
    // const [info, setInfo] = useState<IInfoData>();
    // const [priceInfo, setPriceInfo] = useState<ITickersData>();
    // const [loading, setLoading] = useState<boolean>(true);
    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //         console.log(priceData);

    //     })();
    // }, [coinId]);

    const history = useHistory();
    const { coinId } = useParams<ParamsInterface>();
    const { state } = useLocation<LocationInterface>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId), { refetchInterval: 5000 });
    const setterTheme = useSetRecoilState(isDarkAtom);

    const loading = infoLoading || tickersLoading;

    const MoveHref = () => {
        history.location.state ? history.goBack() : history.push("/")
    }

    return (
        <Wrapper>
            <Helmet>
                <title>{coinId}</title>
            </Helmet>
            <Header>
                <Title> {state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
                <ThemeChangeButton onClick={() => setterTheme(prev => !prev)}>
                    테마 변경
                </ThemeChangeButton>
                <BackButton onClick={MoveHref}>
                    {history.location.state ? "뒤로 가기" : "메인으로"}
                </BackButton>
            </Header>
            <Content>
                {
                    loading ?
                        <MyLoader />
                        :
                        <>
                            <Overview>
                                <OverviewItem>
                                    <span>Rank:</span>
                                    <span>{infoData?.rank}</span>
                                </OverviewItem>
                                <OverviewItem>
                                    <span>Symbol:</span>
                                    <span>${infoData?.symbol}</span>
                                </OverviewItem>
                                <OverviewItem>
                                    <span>Price:</span>
                                    <span>{tickersData?.quotes.USD.price.toFixed(4)}</span>
                                </OverviewItem>
                            </Overview>
                            <Description>{infoData?.description}</Description>
                            <Overview>
                                <OverviewItem>
                                    <span>Total Suply:</span>
                                    <span>{tickersData?.total_supply}</span>
                                </OverviewItem>
                                <OverviewItem>
                                    <span>Max Supply:</span>
                                    <span>{tickersData?.max_supply}</span>
                                </OverviewItem>
                            </Overview>

                            <Tabs>
                                <Tab isActive={chartMatch !== null}>
                                    <Link to={`/${coinId}/chart`}>Chart</Link>
                                </Tab>
                                <Tab isActive={priceMatch !== null}>
                                    <Link to={`/${coinId}/price`}>Price</Link>
                                </Tab>
                            </Tabs>

                            <Switch>
                                <Route path="/:coinId/price">
                                    <Price data={tickersData} />
                                </Route>
                                <Route path="/:coinId/chart">
                                    <Chart coinId={coinId} />
                                </Route>
                            </Switch>
                        </>
                }
            </Content>
        </Wrapper>
    )
}

export default Coin
