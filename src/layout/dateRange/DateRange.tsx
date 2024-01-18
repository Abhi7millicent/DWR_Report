import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

interface DateRangeProps {
  onDateChange: (newDateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  }) => void;
}

const DateRange = (dateRangeProps: DateRangeProps) => {
  const { onDateChange } = dateRangeProps;
  const [isOpenCalander, setIsOpenCalander] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChange = (ranges: any) => {
    setDate(ranges.selection);
    // Call the callback function with the updated date range
    onDateChange(ranges.selection);
  };

  const handlerange = () => {
    setIsOpenCalander((prev) => !prev);
  };

  return (
    <div className="relative border border-solid shadow-md rounded-full bg-white p-2 px-4 justify-center">
      <div>
        <span onClick={handlerange}>{`${format(
          date.startDate,
          `MMM-dd-yyyy`
        )} to ${format(date.endDate, `MMM-dd-yyyy`)}`}</span>
      </div>
      {isOpenCalander && (
        <div>
          <DateRangePicker
            className="absolute z-40 top-16 items-center -left-52 shadow-2xl"
            ranges={[date]}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default DateRange;
