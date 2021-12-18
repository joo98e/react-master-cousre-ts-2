import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

interface IData {
    data?: {
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
        }
    }
}

interface IText {
    state?: boolean;
    size?: number;
}

const Text = styled.span<IText>`
    color : ${props =>
        props.state === undefined ? "#FFF"
            : props.state === true ? "#ff0000" : "#7578f9"};
    font-size : ${props => props.size ? `${props.size}px` : "inherit"};
`;

interface IBox {
    width?: number;
    direction?: "column" | "row";
}
const Box = styled.div<IBox>`
    display: flex;
    width : ${props => props.width ? `${props.width}px` : "auto"};
    flex-direction: ${props => props.direction ? props.direction : "initial"};
    p{
        text-align: right;
    }
    padding : 10px 10px;
    margin-left : auto;
`;

export const Price = ({ data }: IData) => {
    const [state, setState] = useState<boolean>(false);
    const MyData = data && data.quotes.USD;
    useEffect(() => {
        MyData && MyData?.market_cap_change_24h >= 0 ? setState(true) : setState(false);

        console.log(MyData)
    }, [MyData]);
    return (
        <>
            <Box>
                <Text as="h1" size={36}>Now Price</Text>
                <Box direction="column">
                    <Text as="p" size={24} state={state}>$ {MyData?.price.toFixed(2)}</Text>
                </Box>
            </Box>
            <Box>
                <Text as="h1" size={36}>Day Over Day</Text>
                <Box direction="column">
                    <Text as="p" size={12}>{state === true ? "상승" : "하락"}</Text>
                    <Text as="p" size={24} state={state}>{state ? "▲" : "▼"} {MyData?.percent_change_24h.toFixed(2)}%</Text>
                </Box>
            </Box>

            <div style={{ margin: "30px 0" }}></div>

            <Box>
                <Text as="h1" size={36}>Ath Price</Text>
                <Box direction="column">
                    <Text as="p" size={24} state={MyData && MyData?.percent_from_price_ath >= 0 ? true : false}>$ {MyData?.ath_price.toFixed(2)}</Text>
                </Box>
            </Box>
            <Box>
                <Text as="h1" size={36}>Percent from ath price</Text>
                <Box direction="column">
                    <Text as="p" size={12}>{MyData && MyData?.percent_from_price_ath >= 0 ? true : false ? "상승" : "하락"}</Text>
                    <Text as="p" size={24} state={MyData && MyData?.percent_from_price_ath >= 0 ? true : false}>
                        {MyData && MyData?.percent_from_price_ath >= 0 ? "▲" : "▼"} {MyData?.percent_from_price_ath}%
                    </Text>
                </Box>
            </Box>
        </>
    )
}
