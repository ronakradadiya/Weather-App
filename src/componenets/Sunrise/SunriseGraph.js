import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { getLocalTime } from "../../config/config";

import "./SunriseGraph.css";

const data = [
  {
    name: "6am",
    uv: -1000,
  },
  {
    name: "1pm",
    uv: 2000,
  },
  {
    name: "8pm",
    uv: -1000,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.uv));
  const dataMin = Math.min(...data.map((i) => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

const SunriseGraph = ({ selectedDay }) => {
  return (
    <>
      <div className="sun-rise-set-stats">
        <div className="sunrise-stats">
          <h3>Sunrise</h3>
          <p className="sunrise-time">{getLocalTime(selectedDay.sunrise)}</p>
        </div>
        <div className="sunset-stats">
          <h3>Sunset</h3>
          <p className="sunset-time">{getLocalTime(selectedDay.sunset)}</p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "300px",
          marginBottom: "100px",
          paddingBottom: "20px",
        }}
      >
        <ResponsiveContainer>
          <AreaChart
            height={250}
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis interval="preserveStartEnd" dataKey="name" />
            <Tooltip />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#FFF0CD" stopOpacity={1} />
                <stop offset={off} stopColor="#666667" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="uv"
              stroke="orange"
              fill="url(#splitColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SunriseGraph;
