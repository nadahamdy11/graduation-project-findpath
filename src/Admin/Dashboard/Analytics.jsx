import React, { PureComponent } from "react";
import {BarChart,Bar,XAxis,YAxis, Tooltip, Legend, ResponsiveContainer}from "recharts";

const data = [
  {
    date: "01",
    Month: 2400,
  },
  {
    date: "02",
    Month: 1398,
  },
  {
    date: "03",
    Month: 9800,
  },
  {
    date: "04",
    Month: 3908,
  },
  {
    date: "05",
    Month: 4800,
  },
  {
    date: "06",
    Month: 3800,
  },
  {
    date: "07",
    Month: 4300,
  },
  {
    date: "08",
    Month: 2400,
  },
  {
    date: "09",
    Month: 1398,
  },
  {
    date: "10",
    Month: 9800,
  },
  {
    date: "11",
    Month: 3908,
  },
  {
    date: "12",
    Month: 4800,
  },
];

const monthTickFormatter = (tick) => {
  const date = new Date(tick);
  return date.toLocaleString("default", { month: "long" });
};

const renderQuarterTick = (tickProps) => {
  const { payload } = tickProps;
  const { value } = payload;
};
export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="95%" maxHeight={300} style={{margin:"auto",border:"1px rgba(0,0,0,.1) solid ",padding:"20px",borderRadius:"20px"}}>
        <h5 style={{padding:"10px"}}>ANALYTICS</h5>
        <BarChart  data={data} padding={0}>
          <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Month" fill="#FFCD00" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
