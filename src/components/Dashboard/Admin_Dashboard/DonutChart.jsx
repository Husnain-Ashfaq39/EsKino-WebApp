import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const DonutChart = ({ countActive, countClose, countTimeout }) => {
  useEffect(() => {
    const chartElement = document.querySelector('#donut-chart-dash');

    if (chartElement) {
      // Destroy the existing chart instance before creating a new one
      if (window.donutChart) {
        window.donutChart.destroy();
      }

      const donutChartOptions = {
        chart: {
          id: 'donut-chart',
          height: 290,
          type: 'donut',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: [countActive, countClose, countTimeout],
        labels: ['Active', 'Close', 'Timeout'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        legend: {
          position: 'bottom',
        },
      };

      // Create a new chart instance and store it globally
      window.donutChart = new ApexCharts(chartElement, donutChartOptions);
      window.donutChart.render();
    }

    // Cleanup function to destroy the chart when the component unmounts or before re-rendering
    return () => {
      if (window.donutChart) {
        window.donutChart.destroy();
      }
    };
  }, [countActive, countClose, countTimeout]); // Ensure the chart updates when prop values change

  return <div id="donut-chart-dash"></div>;
};

export default DonutChart;
