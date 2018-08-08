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
                    id="orizzonteCalendar"
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

    render() {
        const { label } = this.props;

        return (
            <div
                className="orizzonte__filter"
            >
                <div
                    className="orizzonte__filter-caption"
                >
                    { label }
                </div>
                { this.renderCalendar() }
            </div>
        );
    }
}

Calendar.displayName = 'OrizzonteCalendar';

Calendar.propTypes = {
    calendarProps: PropTypes.object,
    dateFormat: PropTypes.string,
    /** Label for this filter section */
    label: PropTypes.string.isRequired,
    /** Internal callback for when filter value has changed */
    onUpdate: PropTypes.func,
    range: PropTypes.bool,
    value: PropTypes.shape({
        start: PropTypes.any,
        end: PropTypes.any
    })
};

Calendar.defaultProps = {
    calendarProps: {},
    dateFormat: 'YYYY-MM-DD',
    onUpdate: () => {},
    range: false,
    value: null
};

export default Calendar;
