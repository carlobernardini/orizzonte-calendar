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

    renderCalendar() {
        const { calendarProps, dateFormat, onUpdate, value, range } = this.props;
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

        return (
            <DayPickerRangeController
                startDate={ value ? moment(value.start, dateFormat) : null }
                endDate={ value ? moment(value.end, dateFormat) : null }
                onDatesChange={ ({ startDate, endDate }) => {
                    onUpdate({
                        start: startDate ? startDate.format(dateFormat) : startDate,
                        end: endDate ? endDate.format(dateFormat) : endDate
                    });
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
    value: null
};

export default Calendar;
