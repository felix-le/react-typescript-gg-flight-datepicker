import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import DateInput from './DateInput';
import CalendarIcon from '../../assets/svg/calendar.svg';

const DateInputGroup = ({
  showCalendarIcon,
  inputFocus,
  handleClickDateInput,
  fromDate,
  toDate,
  minDate,
  maxDate,
  handleChangeDate,
  startDatePlaceholder,
  endDatePlaceholder,
  dateFormat,
  isSingle,
  onFocus,
  nonFocusable,
}) => {
  function handleClickFromInput() {
    handleClickDateInput('from');
  }

  function handleClickToInput() {
    handleClickDateInput('to');
  }

  function getDateFromValue(action, value) {
    if (action === 'prev') {
      return dayjs(value).subtract(1, 'day');
    }

    return dayjs(value).add(1, 'day');
  }

  function handleChangeFromDate(action, value) {
    const date = getDateFromValue(action, value);
    handleChangeDate(date, 'from');
  }

  function handleChangeToDate(action, value) {
    const date = getDateFromValue(action, value);
    handleChangeDate(date, 'to');
  }

  return (
    <div className="date-picker-input">
      {showCalendarIcon
        && <CalendarIcon className="icon-calendar mobile" viewBox="0 0 24 24" />}
      <div className="date-picker-date-group">
        <DateInput
          handleClickDateInput={handleClickFromInput}
          showIcon
          tabIndex={nonFocusable ? '-1' : '0'}
          isFocus={inputFocus === 'from'}
          value={fromDate}
          placeholder={startDatePlaceholder}
          handleChangeDate={handleChangeFromDate}
          dateFormat={dateFormat}
          isSingle={isSingle}
          name="START_DATE"
          onFocus={onFocus}
          nonFocusable={nonFocusable}
          minDate={minDate}
          maxDate={maxDate}
        />
        {!isSingle
        && (
          <DateInput
            handleClickDateInput={handleClickToInput}
            tabIndex="0"
            isFocus={inputFocus === 'to'}
            value={toDate}
            placeholder={endDatePlaceholder}
            handleChangeDate={handleChangeToDate}
            dateFormat={dateFormat}
            name="END_DATE"
            nonFocusable={nonFocusable}
            minDate={minDate}
            maxDate={maxDate}
            fromDate={fromDate}
          />
        )}
      </div>
    </div>
  );
};

DateInputGroup.propTypes = {
  handleClickDateInput: PropTypes.func,
  showCalendarIcon: PropTypes.bool,
  inputFocus: PropTypes.string,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  handleChangeDate: PropTypes.func,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  dateFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  onFocus: PropTypes.func,
  nonFocusable: PropTypes.bool,
};

DateInputGroup.defaultProps = {
  handleClickDateInput: () => {},
  showCalendarIcon: false,
  inputFocus: null,
  fromDate: null,
  toDate: null,
  minDate: null,
  maxDate: null,
  handleChangeDate: () => {},
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  dateFormat: '',
  isSingle: false,
  onFocus: () => {},
  nonFocusable: false,
};

export default DateInputGroup;
