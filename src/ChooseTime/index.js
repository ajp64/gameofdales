import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import css from "./index.module.css";
import moment from "moment";

export function ChooseTime() {
  const [copied, setCopied] = useState(false);
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);
  const [defday, setDefDay] = useState("");
  const [defmon, setDefMon] = useState("");

  const dt = DateTime.fromObject(
    { day: day, hour: hour, minute: min },
    { zone: "Pacific/Auckland" }
  );

  useEffect(() => {
    if (dt.day.toString().length === 1) {
      setDefDay("0" + dt.day.toString());
    } else {
      setDefDay(dt.day.toString());
    }
    console.log(defday);
    if (dt.month.toString().length === 1) {
      setDefMon("0" + dt.month.toString());
    } else {
      setDefMon(dt.mon.toString());
    }
    console.log(defmon);
  });

  const ukDt = dt.setZone("Europe/London");

  const [copyValue, setValue] = useState(
    `Game Time in NZ: ${dt.toLocaleString(
      DateTime.DATETIME_MED
    )},   Game Time in UK: ${ukDt.toLocaleString(DateTime.DATETIME_MED)}`
  );

  function copyChange() {
    setValue(
      `Game Time in NZ: ${dt.toLocaleString(
        DateTime.DATETIME_MED
      )},   Game Time in UK: ${ukDt.toLocaleString(DateTime.DATETIME_MED)}`
    );
    console.log(copyValue);
  }

  function onCopy() {
    setCopied(true);
  }

  function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    console.log(dateString.split(" ")[0].split("-")[2]);
    console.log(dateString.split(" ")[1].split(":")[1]);
    console.log(dateString.split(" ")[1].split(":")[2]);
    setDay(dateString.split(" ")[0].split("-")[2]);
    setHour(dateString.split(" ")[1].split(":")[0]);
    setMin(dateString.split(" ")[1].split(":")[1]);
    setCopied(false);
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  useEffect(() => {
    copyChange();
  }, [copyChange]);

  console.log(`${dt.year}-${defmon}-${defday}T09:00:00.886Z`, defday, defmon);

  if (defmon) {
    return (
      <Space className={css.date} direction="vertical" size={16}>
        <DatePicker
          showTime
          onChange={onChange}
          onOk={onOk}
          placeholder={"Choose Dale Time"}
          className={css.datePicker}
          defaultValue={moment(`${dt.year}-${defmon}-${defday}T09:00:00.886Z`)}
        />
        <section className="section">
          {copied ? (
            <span style={{ color: "red" }}>Copied!</span>
          ) : (
            <span style={{ color: "red" }}>
              Click times to copy to clipboard:
            </span>
          )}
        </section>
        <CopyToClipboard onCopy={onCopy} text={copyValue}>
          <h2
            className={css.date}
            onClick={copyChange}
          >{`Game Time in NZ: ${dt.toLocaleString(
            DateTime.DATETIME_MED
          )},   Game Time in UK: ${ukDt.toLocaleString(
            DateTime.DATETIME_MED
          )}`}</h2>
        </CopyToClipboard>
      </Space>
    );
  } else {
    return <></>;
  }
}
