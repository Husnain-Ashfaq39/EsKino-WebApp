import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";
import { db } from "../../../config/firebase";

const ParticipantChart = () => {
  const [chartData, setChartData] = useState(Array(12).fill(0));

  useEffect(() => {
    const fetchChartData = async () => {
      const oneYearAgo = moment().subtract(1, "year").startOf("month").toDate();

      // Fetch all meetings ending within the past year
      const meetingsQuery = query(
        collection(db, "meetings"),
        where("endDate", ">=", oneYearAgo)
      );
      const meetingsSnapshot = await getDocs(meetingsQuery);

      // Fetch all participants
      const participantsQuery = query(collection(db, "participants"));
      const participantsSnapshot = await getDocs(participantsQuery);

      // Fetch all deleted participants
      const deletedParticipantsQuery = query(collection(db, "Deleted Participants"));
      const deletedParticipantsSnapshot = await getDocs(deletedParticipantsQuery);

      const data = Array(12).fill(0);

      // Map meetings to their end month
      const meetingEndMonths = {};
      meetingsSnapshot.forEach((doc) => {
        const meetingData = doc.data();
        const endDate = meetingData.endDate.toDate();
        const monthIndex = moment(endDate).month(); // Get the month index (0-11)
        const meetingId = doc.id;
        meetingEndMonths[meetingId] = monthIndex;
      });

      // Sum participants for each month based on sectionId (meeting ID)
      participantsSnapshot.forEach((doc) => {
        const participantData = doc.data();
        const sectionId = participantData.sectionId;
        const persons = parseInt(participantData.persons, 10) || 0;

        if (meetingEndMonths[sectionId] !== undefined) {
          data[meetingEndMonths[sectionId]] += persons;
        }
      });

      // Sum deleted participants for each month based on startDate and endDate
      deletedParticipantsSnapshot.forEach((doc) => {
        const participantData = doc.data();
        const persons = parseInt(participantData.persons, 10) || 0;
        const endDate = participantData.endDate.toDate();
        const monthIndex = moment(endDate).month(); // Get the month index (0-11)

        data[monthIndex] += persons;
      });

      // Adjust the order of data to start from the current month and go back one year
      const currentMonthIndex = moment().month();
      const adjustedData = data
        .slice(currentMonthIndex + 1)
        .concat(data.slice(0, currentMonthIndex + 1));

      setChartData(adjustedData);
    };

    fetchChartData();
  }, []);

  useEffect(() => {
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
          name: "Persons",
          color: "#2E37A4",
          data: chartData,
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
  }, [chartData]);

  return <div id="patient-chart"></div>;
};

export default ParticipantChart;
