import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DayPickerRangeController, DayPickerSingleDateController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: 'startDate'
        };
    }

    getParsedRange() {
        const { dateFormat, value, rangeStringSeparator } = this.props;

        if (!value) {
            return {
                start: null,
                end: null
            };
        }

        if (!rangeStringSeparator) {
            return {
                start: value ? moment(value.start, dateFormat) : null,
                end: value ? moment(value.end, dateFormat) : null
            };
        }

        const parts = value.split(rangeStringSeparator);

        if (parts.length === 2) {
            return {
                start: moment(parts[0], dateFormat),
                end: moment(parts[1], dateFormat)
            };
        }

        if (value.indexOf(rangeStringSeparator) === 0) {
            return {
                start: null,
                end: moment(parts[0], dateFormat)
            };
        }

        return {
            start: moment(parts[0], dateFormat),
            end: null
        };
    }

    renderCalendar() {
        const {
            calendarProps, dateFormat, onUpdate, value, range, rangeStringSeparator
        } = this.props;
        const { focusedInput } = this.state;

        if (!range) {
            return (
                <DayPickerSingleDateController
                    date={ value ? moment(value, dateFormat) : null }
                    onDateChange={ (date) => {
                        onUpdate(date ? date.format(dateFormat) : date);
                    }}
                    onFocusChange={ () => {} }
                    focused
                    { ...calendarProps }
                />
            );
        }

        const { start, end } = this.getParsedRange();

        return (
            <DayPickerRangeController
                startDate={ start }
                endDate={ end }
                onDatesChange={ ({ startDate, endDate }) => {
                    const startValue = startDate ? startDate.format(dateFormat) : startDate;
                    const endValue = endDate ? endDate.format(dateFormat) : endDate;

                    if (!rangeStringSeparator) {
                        return onUpdate({
                            start: startValue,
                            end: endValue
                        });
                    }

                    return onUpdate(
                        [startValue, endValue].join(rangeStringSeparator)
                    );
                } }
                focusedInput={ focusedInput }
                onFocusChange={ (input) => {
                    this.setState({
                        focusedInput: input || 'startDate'
                    });
                }}
                { ...calendarProps }
            />
        );
    }

    renderCaption() {
        const { label } = this.props;

        if (!label) {
            return null;
        }

        return (
            <div
                className="orizzonte__filter-caption"
            >
                { label }
            </div>
        );
    }

    render() {
        return (
            <div
                className="orizzonte__filter"
            >
                { this.renderCaption() }
                { this.renderCalendar() }
            </div>
        );
    }
}

Calendar.displayName = 'OrizzonteCalendar';

Calendar.propTypes = {
    /** Optional props to be passed on to the react-dates component */
    calendarProps: PropTypes.object,
    /** Desired format for the selected dates
        See https://momentjs.com/docs/#/displaying/ for possible values */
    dateFormat: PropTypes.string,
    /** Label for this filter section */
    label: PropTypes.string,
    /** Internal callback for when filter value has changed */
    onUpdate: PropTypes.func,
    /** Whether to show a date range picker or a single day picker */
    range: PropTypes.bool,
    /** When using a range separator, the date range will be stored as (separated) string */
    rangeStringSeparator: PropTypes.string,
    /** The selected value */
    value: PropTypes.shape({
        start: PropTypes.any,
        end: PropTypes.any
    })
};

Calendar.defaultProps = {
    calendarProps: {},
    dateFormat: 'YYYY-MM-DD',
    label: null,
    onUpdate: () => {},
    range: false,
    rangeStringSeparator: null,
    value: null
};

export default Calendar;
