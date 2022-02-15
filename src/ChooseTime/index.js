import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";

export function ChooseTime() {
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);

  const dt = DateTime.fromObject(
    { day: day, hour: hour, minute: min },
    { zone: "Pacific/Auckland" }
  );

  const ukDt = dt.setZone("Europe/London");

  // const ukDt = DateTime.fromObject(
  //   { day: day, hour: hour, minute: min },
  //   { zone: "Europe/London" }
  // );

  function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    console.log(dateString.split(" ")[0].split("-")[2]);
    console.log(dateString.split(" ")[1].split(":")[1]);
    console.log(dateString.split(" ")[1].split(":")[2]);
    setDay(dateString.split(" ")[0].split("-")[2]);
    setHour(dateString.split(" ")[1].split(":")[0]);
    setMin(dateString.split(" ")[1].split(":")[1]);
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  return (
    <Space direction="horizontal" size={16}>
      <DatePicker showTime onChange={onChange} onOk={onOk} />
      <h2>{`Time in NZ: ${dt.toLocaleString(
        DateTime.DATETIME_MED
      )} Time in UK: ${ukDt.toLocaleString(DateTime.DATETIME_MED)}`}</h2>
    </Space>
  );
}
