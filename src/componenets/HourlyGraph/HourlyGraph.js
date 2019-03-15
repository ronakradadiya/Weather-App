import React, { PureComponent } from "react";
import "./HourlyGraph.css";
import { LineChart, Line, CartesianGrid, XAxis, Tooltip } from "recharts";
import { getHourlyData } from "../../config/config";

const CustomTooltip = (props) => {
  const { active, payload } = props;
  if (active) {
    return (
      <div
        style={{
          border: "1px solid rgb(204, 204, 204)",
          padding: "10px",
          backgroundColor: "#ffffff",
        }}
      >
        <p style={{ marginBottom: "5px" }}>Time: {payload[0].payload.time}</p>
        <p style={{ color: "#00A6FA", marginBottom: "5px" }}>
          Temperature: {payload[0].payload.temperature}°
        </p>
      </div>
    );
  }
  return "";
};

const CustomName = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-6}
        dy={16}
        textAnchor="start"
        fill="#000000"
        transform="rotate(0)"
        style={{
          fontWeight: "bold",
        }}
      >
        {payload.value}°
      </text>
    </g>
  );
};

class HourlyGraph extends PureComponent {
  render() {
    const { selectedDay, hourly } = this.props;
    const todaysHourlyData = getHourlyData(selectedDay, hourly);

    return (
      <div
        style={{
          width: "100%",
          height: "350px",
          overflowX: "auto",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <LineChart
          width={2500}
          height={300}
          data={todaysHourlyData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" horizontal={false} />
          <XAxis
            xAxisId={0}
            interval="preserveStartEnd"
            dataKey="temperature"
            tick={<CustomName />}
            tickLine={false}
          />
          <XAxis
            className="axis-line"
            xAxisId={1}
            interval="preserveStartEnd"
            dataKey="time"
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="temperature"
            dot={{ stroke: "#1CA9F4", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </div>
    );
  }
}

export default HourlyGraph;
