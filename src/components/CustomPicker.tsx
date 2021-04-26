import React from 'react'
import { DatePicker as AntdDatePicker } from 'antd'
import moment, { Moment } from 'moment-timezone'

interface Props {
  value: string
  record: any
}

function DatePicker({ value, record }: Props) {
  const warsaw = moment.tz(value, "Europe/Warsaw")
  
  const handleChange = (date: Moment | null, _dateString: string) => {
    record.date = date?.utc().format()
  }

  return <AntdDatePicker showTime value={warsaw} onChange={handleChange} />
}

export default DatePicker
