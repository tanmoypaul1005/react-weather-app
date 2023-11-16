import React, { useEffect, useState } from "react";
import { AreaChart, Card, Title } from "@tremor/react";

function AreaChartCard({ weatherDetails }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const currentWeekStart = new Date();
    currentWeekStart.setHours(0, 0, 0, 0);
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);
    currentWeekEnd.setHours(23, 59, 59, 999);
  
    const filteredHourly = weatherDetails?.hourly?.time?.filter(
      (time) => new Date(time) >= currentWeekStart && new Date(time) <= currentWeekEnd
    );
  
    const hourly = filteredHourly?.map((time) => ({
      Time: new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false }),
      Day: new Date(time).toLocaleString("en-US", { weekday: "short" }), // Get short day name
      "Temperature (C)": weatherDetails?.hourly?.temperature_2m[filteredHourly.indexOf(time)],
    }));
  
    setChartData(hourly);
  }, [weatherDetails]);
  
  

  return (
    <Card className="!bg-gray-100">
      <Title className="!text-black">Temperature over time (C)</Title>
      <AreaChart
  data={chartData}
  index="Time"
  categories={["Temperature (C)"]}
  color="indigo"
  xLabel="Day" // Specify the property to use for the x-axis labels
/>

    </Card>
  );
}

export default AreaChartCard;
