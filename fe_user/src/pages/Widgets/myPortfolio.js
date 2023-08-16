import React from 'react';
import ReactApexChart from "react-apexcharts";

const MyPortfolioCharts = () => {
    const donutchartportfolioColors = ["#405189", "#299cdb", "#f7b84b", "#0ab39c"];
    const series = [19405, 40552, 15824, 30635];
    var options = {
        labels: ["Bitcoin", "Ethereum", "Litecoin", "Dash"],
        chart: {
            type: "donut",
            height: 224,
        },

        plotOptions: {
            pie: {
                size: 100,
                offsetX: 0,
                offsetY: 0,
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '18px',
                            offsetY: -5,
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            color: '#343a40',
                            fontWeight: 500,
                            offsetY: 5,
                            formatter: function (val) {
                                return "$" + val;
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '13px',
                            label: 'Total value',
                            color: '#9599ad',
                            fontWeight: 500,
                            formatter: function (w) {
                                return "$" + w.globals.seriesTotals.reduce(function (a, b) {
                                    return a + b;
                                }, 0);
                            }
                        }
                    }
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return "$" + value;
                }
            }
        },
        stroke: {
            lineCap: "round",
            width: 2
        },
        colors: donutchartportfolioColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height="210"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export default MyPortfolioCharts;
