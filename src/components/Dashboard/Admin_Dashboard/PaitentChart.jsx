import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";
import { db } from "../../../config/firebase";

const PatientChart = () => {
  const [chartData, setChartData] = useState({ male: [], female: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      const oneYearAgo = moment().subtract(1, "year").startOf("month");

      // Initialize arrays to store participant counts
      const maleData = Array(12).fill(0);
      const femaleData = Array(12).fill(0);

      // Fetch all meetings ending within the past year
      const meetingsQuery = query(
        collection(db, "meetings"),
        where("endDate", ">=", oneYearAgo.toDate())
      );
      const meetingsSnapshot = await getDocs(meetingsQuery);

      // Map meeting IDs to their end month and count participants
      meetingsSnapshot.forEach((doc) => {
        const data = doc.data();
        const endDate = moment(data.endDate.toDate());
        const monthIndex = endDate.diff(oneYearAgo, "months");

        if (monthIndex >= 0 && monthIndex < 12) {
          if (data.Participants) {
            if (typeof data.Participants === "number") {
              // If Participants is a number, divide equally for demo purposes
              maleData[monthIndex] += data.Participants / 2;
              femaleData[monthIndex] += data.Participants / 2;
            } else {
              maleData[monthIndex] += data.Participants.male || 0;
              femaleData[monthIndex] += data.Participants.female || 0;
            }
          }
        }
      });

      // Adjust the order of data to start from the current month and go back one year
      const currentMonthIndex = moment().month();
      const adjustedMaleData = maleData
        .slice(currentMonthIndex + 1)
        .concat(maleData.slice(0, currentMonthIndex + 1));
      const adjustedFemaleData = femaleData
        .slice(currentMonthIndex + 1)
        .concat(femaleData.slice(0, currentMonthIndex + 1));

      setChartData({ male: adjustedMaleData, female: adjustedFemaleData });
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    if (document.querySelector("#patient-chart")) {
      const currentMonthIndex = moment().month();
      const sColStackedOptions = {
        chart: {
          height: 230,
          type: "bar",
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
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            name: "Male",
            color: "#2E37A4",
            data: chartData.male,
          },
          {
            name: "Female",
            color: "#00D3C7",
            data: chartData.female,
          },
        ],
        xaxis: {
          categories: moment
            .monthsShort()
            .slice(currentMonthIndex + 1)
            .concat(moment.monthsShort().slice(0, currentMonthIndex + 1)),
        },
      };

      const chart = new ApexCharts(
        document.querySelector("#patient-chart"),
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
