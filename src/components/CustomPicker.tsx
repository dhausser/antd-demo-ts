import React from "react";
import { DatePicker as AntdDatePicker } from "antd";
import moment, { Moment } from "moment-timezone";

interface Props {
  value: string;
}

function DatePicker({ value }: Props) {
  const warsaw = moment.tz(value, "Europe/Warsaw");

  const handleChange = (date: Moment | null, dateString: string) => {
    const newDate = date?.utc().format();
    console.log({ dateString, newDate });
  };

  return <AntdDatePicker showTime value={warsaw} onChange={handleChange} />;
}

export default DatePicker;
