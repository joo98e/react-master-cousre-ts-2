import React from 'react'
import { useQuery } from 'react-query'
import { fetchCoinHistory } from '../Api/api'
import ApexChart from 'react-apexcharts'
import { MyLoader } from '../Assets/UIComponents'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from './Atoms'

interface IChart {
    coinId: string;
}

interface IHistorical {
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number
}

interface IChartToolTip {
    value: number
}

export const Chart = ({ coinId }: IChart) => {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <div>
            {
                isLoading ?
                    <MyLoader />
                    :
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name: "종가",
                                data: data?.map(data => { return data.close })
                            },
                        ]}
                        options={{
                            chart: {
                                height: 500,
                                width: 500,
                                defaultLocale: 'ko',
                                locales: [{
                                    name: 'ko',
                                    options: {
                                        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                        shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                        days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                                        shortDays: ['일', '월', '화', '수', '목', '금', '토'],

                                    }
                                }]
                            },
                            theme: {
                                mode: isDark ? "light" : "dark"
                            },
                            xaxis: {
                                type: "datetime",
                                categories: data?.map(data => { return data.time_close }),
                                labels: {
                                    rotate: -45,
                                    datetimeUTC: false,
                                    format: "MM월 dd일",
                                    style: {
                                        fontFamily: "Nanum Gothic, sans-serif"
                                    }
                                },
                                title: {
                                    text: `${coinId}의 종가 현황`
                                },
                                axisTicks: {
                                    show: false
                                },
                                tooltip: { enabled: false }
                            },
                            yaxis: {
                                labels: {
                                    show: false
                                }
                            },
                            fill: {
                                type: "gradient",
                                gradient: { gradientToColors: ["blue"], stops: [0, 50] }
                            },
                            colors: ["green"],
                            tooltip: {
                                x: {
                                    show: true,
                                    format: "MM월 dd일",
                                },
                                y: {
                                    formatter: (value) => `$${value.toFixed(2)}`
                                },
                                marker: { show: false }
                            },
                            stroke: {
                                curve: "smooth",
                                width: 5
                            },
                            grid: { show: false },
                        }}
                    />
            }
        </div>
    )
}
