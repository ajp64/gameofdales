import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function ChooseTime() {
  const [copied, setCopied] = useState(false);
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);

  const dt = DateTime.fromObject(
    { day: day, hour: hour, minute: min },
    { zone: "Pacific/Auckland" }
  );

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

  return (
    <Space direction="horizontal" size={16}>
      <DatePicker showTime onChange={onChange} onOk={onOk} />
      <CopyToClipboard onCopy={onCopy} text={copyValue}>
        <h2 onClick={copyChange}>{`Game Time in NZ: ${dt.toLocaleString(
          DateTime.DATETIME_MED
        )},   Game Time in UK: ${ukDt.toLocaleString(
          DateTime.DATETIME_MED
        )}`}</h2>
      </CopyToClipboard>
      <section className="section">
        {copied ? (
          <span style={{ color: "red" }}>Copied!</span>
        ) : (
          <span style={{ color: "red" }}>
            Click times to copy to clipboard.
          </span>
        )}
      </section>
    </Space>
  );
}
