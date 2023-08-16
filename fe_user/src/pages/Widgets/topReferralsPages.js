import React from 'react';
import ReactApexChart from "react-apexcharts";

const TopReferralsPagesCharts = () => {
    function generateData(count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = 'w' + (i + 1).toString();
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
    }

    const chartHeatMapColors = ["#0ab39c", "#299cdb", "#405189", "#f7b84b", "#3577f1"];

    const dataChart = {
        series: [{
            name: 'Jan',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Feb',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Mar',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Apr',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'May',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Jun',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Jul',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Aug',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Sep',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        }
        ],
        options: {
            chart: {
                height: 350,
                type: 'heatmap',
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false,
            },
            stroke: {
                width: 1
            },
            title: {
                text: 'HeatMap Chart with Color Range',
                style: {
                    fontWeight: 500,
                },
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: true,
                    dataLabels: {
                        enabled: false
                    },
                    colorScale: {
                        ranges: [{
                            from: -30,
                            to: 5,
                            name: 'Low',
                            color: chartHeatMapColors[0]
                        },
                        {
                            from: 6,
                            to: 20,
                            name: 'Medium',
                            color: chartHeatMapColors[1]
                        },
                        {
                            from: 21,
                            to: 45,
                            name: 'High',
                            color: chartHeatMapColors[2]
                        },
                        {
                            from: 46,
                            to: 55,
                            name: 'Extreme',
                            color: chartHeatMapColors[3]
                        }
                        ],
                    }
                }
            },
            
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart options={dataChart.options} series={dataChart.series} type="heatmap" height={350} className="apex-charts" />
        </React.Fragment>
    );
};

export default TopReferralsPagesCharts;