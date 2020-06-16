import React, { useEffect, useState, MouseEvent } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';

// import CalendarIcon from '../../assets/svg/calendar.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';
import PrevIcon from '@/assets/svg/prev.svg';
import NextIcon from '@/assets/svg/next.svg';

interface DateInputProps {
  handleClickDateInput: handleClickDateInput;
  showIcon: showIcon;
  tabIndex: tabIndex;
  isFocus: isFocus;
  placeholder: placeholder;
  dateFormat: dateFormat;
  isSingle: isSingle;
  onFocus: onFocus;
  name: name;
  nonFocusable: nonFocusable;
  fromDate: fromDate;
  minDate: minDate;
  maxDate: maxDate;
  value: value;
  handleChangeDate: Function;
}

export const DateInput: React.FC<DateInputProps> = ({
  handleClickDateInput,
  showIcon,
  tabIndex,
  isFocus,
  value,
  placeholder,
  handleChangeDate,
  dateFormat,
  isSingle,
  onFocus,
  name,
  nonFocusable,
  fromDate,
  minDate,
  maxDate,
}) => {
  const [formattedDate, setFormattedDate] = useState<null>(null);
  const [disablePrev, setDisablePrev] = useState<boolean>(false);
  const [disableNext, setDisableNext] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      let text = value.format('ddd, DD MMM');
      if (dateFormat) {
        text = value.format(dateFormat);
      }
      setFormattedDate(text);

      if (
        (minDate && dayjs(minDate).add(1, 'day').isAfter(value, 'date')) ||
        (name === 'END_DATE' && value.isBefore(fromDate.add(1, 'day'), 'date'))
      ) {
        setDisablePrev(true);
      } else {
        setDisablePrev(false);
      }

      if (
        maxDate &&
        dayjs(maxDate).subtract(1, 'day').isBefore(value, 'date')
      ) {
        setDisableNext(true);
      } else {
        setDisableNext(false);
      }
    } else {
      setFormattedDate(null);
    }
  }, [value, fromDate]);

  function prevDate(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    handleChangeDate('prev', value);
  }

  function nextDate(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    handleChangeDate('next', value);
  }

  function onDateInputFocus() {
    if (onFocus) onFocus(name);
  }

  return (
    <div
      className={cx('date', { 'is-focus': isFocus, 'is-single': isSingle })}
      role="button"
      tabIndex={nonFocusable ? -1 : tabIndex}
      onClick={handleClickDateInput}
      onFocus={onDateInputFocus}
      id="start-date-input-button"
    >
      {showIcon && (
        <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />
      )}

      <div className="selected-date">
        {formattedDate || <div className="date-placeholder">{placeholder}</div>}
      </div>
      {formattedDate && (
        <div className="change-date-group">
          <button
            type="button"
            className="btn-outline change-date-button"
            onClick={prevDate}
            tabIndex={nonFocusable ? -1 : 0}
            disabled={disablePrev}
          >
            <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
          <button
            type="button"
            className="btn-outline change-date-button"
            onClick={nextDate}
            tabIndex={nonFocusable ? -1 : 0}
            disabled={disableNext}
          >
            <NextIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
        </div>
      )}
    </div>
  );
};
