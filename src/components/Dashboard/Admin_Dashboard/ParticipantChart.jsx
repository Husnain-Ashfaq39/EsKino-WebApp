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

      console.log("Meetings fetched:", meetingsSnapshot.size);

      // Fetch all participants
      const participantsQuery = query(collection(db, "participants"));
      const participantsSnapshot = await getDocs(participantsQuery);

      console.log("Participants fetched:", participantsSnapshot.size);

      // Create a map of meeting IDs to participant counts
      const meetingParticipantsMap = {};
      participantsSnapshot.forEach((doc) => {
        const participantData = doc.data();
        const sectionId = participantData.sectionId;
        const persons = parseInt(participantData.persons, 10) || 0;

        if (!meetingParticipantsMap[sectionId]) {
          meetingParticipantsMap[sectionId] = 0;
        }

        meetingParticipantsMap[sectionId] += persons;
      });

      console.log("Meeting participants map:", meetingParticipantsMap);

      const data = Array(12).fill(0);

      // Map meeting IDs to their end month and sum participants
      meetingsSnapshot.forEach((doc) => {
        const meetingData = doc.data();
        console.log("Meeting data:", meetingData);
        const endDate = meetingData.endDate.toDate();
        const monthIndex = moment(endDate).month(); // Get the month index (0-11)
        const meetingId = doc.id;

        const participants = meetingParticipantsMap[meetingId] || 0;
        data[monthIndex] += participants;
      });

      console.log("Chart data:", data);

      // Adjust the order of data to start from the current month and go back one year
      const currentMonthIndex = moment().month();
      const adjustedData = data
        .slice(currentMonthIndex + 1)
        .concat(data.slice(0, currentMonthIndex + 1));

      console.log("Adjusted data:", adjustedData);

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

    console.log("Chart options:", sColStackedOptions);

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
