import React from 'react';
import ReactApexChart from "react-apexcharts";

const SessionsByCountriesCharts = () => {
    const barchartCountriesColors = ["#299cdb","#299cdb","#299cdb","#299cdb","#f06548" ,"#299cdb","#299cdb","#299cdb","#299cdb","#299cdb"]
    const series = [{
        data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
        name: 'Sessions',
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 436,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                distributed: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        colors: barchartCountriesColors,
        dataLabels: {
            enabled: true,
            offsetX: 32,
            style: {
                fontSize: '12px',
                fontWeight: 400,
                colors: ['#adb5bd']
            }
        },

        legend: {
            show: false,
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: ['India', 'United States', 'China', 'Indonesia', 'Russia', 'Bangladesh', 'Canada', 'Brazil', 'Vietnam', 'UK'],
        },
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height="436"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export default SessionsByCountriesCharts;