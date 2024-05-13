import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import { db } from '../../../config/firebase';

const PatientChart = () => {
  const [chartData, setChartData] = useState({ male: [], female: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      const oneYearAgo = moment().subtract(1, 'year').startOf('month');
      const currentMonth = moment().startOf('month');

      // Initialize arrays to store participant counts
      const maleData = Array(12).fill(0);
      const femaleData = Array(12).fill(0);

      // Fetch all meetings within the past year
      const meetingsQuery = query(
        collection(db, 'meetings'),
        where('startDate', '>=', oneYearAgo.toDate())
      );
      const meetingsSnapshot = await getDocs(meetingsQuery);

      // Map meeting IDs to their start month
      const meetingMonthMap = {};
      meetingsSnapshot.forEach(doc => {
        const data = doc.data();
        const startDate = moment(data.startDate.toDate(), 'DD/MM/YYYY'); // Adjust date format as needed
        const monthIndex = startDate.diff(oneYearAgo, 'months');
        if (monthIndex >= 0 && monthIndex < 12) {
          meetingMonthMap[doc.id] = monthIndex;
        }
      });

      // Fetch all participants for the valid meeting IDs
      const participantQueries = Object.keys(meetingMonthMap).map(meetingId =>
        query(collection(db, 'participants'), where('sectionId', '==', meetingId))
      );

      const participantSnapshots = await Promise.all(
        participantQueries.map(q => getDocs(q))
      );

      // Count participants based on their associated meeting month
      participantSnapshots.forEach(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const monthIndex = meetingMonthMap[data.sectionId];
          if (monthIndex !== undefined) {
            if (data.gender === 'Male') {
              maleData[monthIndex] += 1;
            } else if (data.gender === 'Female') {
              femaleData[monthIndex] += 1;
            }
          }
        });
      });

      // Adjust the order of data to start from the current month and go back one year
      const currentMonthIndex = moment().month();
      const adjustedMaleData = maleData.slice(currentMonthIndex).concat(maleData.slice(0, currentMonthIndex));
      const adjustedFemaleData = femaleData.slice(currentMonthIndex).concat(femaleData.slice(0, currentMonthIndex));

      setChartData({ male: adjustedMaleData, female: adjustedFemaleData });
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    if (document.querySelector('#patient-chart')) {
      const sColStackedOptions = {
        chart: {
          height: 230,
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '15%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            name: 'Male',
            color: '#2E37A4',
            data: chartData.male,
          },
          {
            name: 'Female',
            color: '#00D3C7',
            data: chartData.female,
          },
        ],
        xaxis: {
          categories: moment.monthsShort().slice(moment().month()).concat(moment.monthsShort().slice(0, moment().month())),
        },
      };

      const chart = new ApexCharts(
        document.querySelector('#patient-chart'),
        sColStackedOptions
      );

      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return <div id="patient-chart"></div>;
};

export default PatientChart;
