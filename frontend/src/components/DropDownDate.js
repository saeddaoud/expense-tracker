import React, { useEffect, useMemo } from 'react';
import './DropDownDate.css';

const months = [
  'Month',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DropDownDate = ({
  setYear,
  setMonth,
  yearErr,
  monthErr,
  year,
  month,
  flexDirection = 'row',
  filter = false,
}) => {
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const yearsTemp = [];
    yearsTemp.push('Year');
    // if (filter) yearsTemp.push('all');
    for (let i = 0; i <= 5; i++) {
      yearsTemp.push(currentYear - i);
    }
    return yearsTemp;
  }, [filter, currentYear]);

  useEffect(() => {
    setMonth(months[0]);
    setYear(years[0]);
  }, [years, setYear, setMonth]);

  return (
    <div
      className={
        flexDirection !== 'column'
          ? 'dropdown-date'
          : 'dropdown-date dropdown-date-column'
      }
    >
      <div className='years'>
        <select
          name='year'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={filter ? 'filter' : ''}
        >
          {years.map((yearEl) => (
            <option
              value={yearEl}
              key={`year${yearEl}`}
              disabled={yearEl === 'Year'}
            >
              {yearEl}
            </option>
          ))}
        </select>
        {yearErr && <div className='error'>{yearErr}</div>}{' '}
      </div>

      <div className='months'>
        <select
          name='month'
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
          className={filter ? 'filter' : ''}
        >
          {months.map((monthEl) => (
            <option
              value={monthEl}
              key={`month${monthEl}`}
              disabled={monthEl === 'Month'}
            >
              {monthEl}
            </option>
          ))}
        </select>
        {monthErr && <div className='error'>{monthErr}</div>}{' '}
      </div>
    </div>
  );
};

export default DropDownDate;
