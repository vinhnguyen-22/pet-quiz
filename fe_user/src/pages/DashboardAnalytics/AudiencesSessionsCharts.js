import React from 'react';
import ReactApexChart from "react-apexcharts";

const AudiencesSessionsCharts = () => {
    function generateData(count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = (i + 1).toString() + "h";
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    
            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
    }
    const chartHeatMapBasicColors = ["#0ab39c", "#299cdb"];
    const series = [{
        name: 'Sat',
        data: generateData(18, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'Fri',
        data: generateData(18, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'Thu',
        data: generateData(18, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'Wed',
        data: generateData(18, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'Tue',
        data: generateData(18, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'Mon',
        data: generateData(18, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'Sun',
        data: generateData(18, {
            min: 0,
            max: 90
        })
    }
    ];
    var options = {
        chart: {
            height: 400,
            type: 'heatmap',
            offsetX: 0,
            offsetY: -8,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                        from: 0,
                        to: 50,
                        color: chartHeatMapBasicColors[0]
                    },
                    {
                        from: 51,
                        to: 100,
                        color: chartHeatMapBasicColors[1]
                    },
                    ],
                },

            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: true,
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 20,
            markers: {
                width: 20,
                height: 6,
                radius: 2,
            },
            itemMargin: {
                horizontal: 12,
                vertical: 0
            },
        },
        colors: chartHeatMapBasicColors,
        tooltip: {
            y: [{
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + "k";
                    }
                    return y;
                }
            }]
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="heatmap"
                height="400"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export default AudiencesSessionsCharts;