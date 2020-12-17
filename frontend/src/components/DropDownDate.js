import React, { useEffect } from 'react';
import './DropDownDate.css';

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

  const currentYear = new Date().getFullYear();
  const years = [];
  years.push('Year');
  if (filter) years.push('all');
  for (let i = 0; i <= 5; i++) {
    years.push(currentYear - i);
  }

  useEffect(() => {
    setMonth(months[0]);
    setYear(years[0]);
  }, []);

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
      {!filter && (
        <div className='months'>
          <select
            name='month'
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
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
      )}
    </div>
  );
};

export default DropDownDate;
