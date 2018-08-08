import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class Calendar extends Component {
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
                <DayPickerRangeController
                    onDatesChange={ () => {} }
                    onFocusChange={ () => {} }
                    startDateId="startDate"
                    endDateId="endDate"
                    numberOfMonths={ 2 }
                    focused
                    small
                />
            </div>
        );
    }
}

Calendar.displayName = 'OrizzonteCalendar';

Calendar.propTypes = {
    /** Field name for this filter, to be used in composed query */
    // fieldName: PropTypes.string.isRequired,
    /** Label for this filter section */
    label: PropTypes.string.isRequired,
    /** Internal callback for when filter value has changed */
    // onUpdate: PropTypes.func,
    // value: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.number,
    //     PropTypes.arrayOf(
    //         PropTypes.oneOfType([
    //             PropTypes.string,
    //             PropTypes.number
    //         ])
    //     )
    // ]),
    // onUpdate: PropTypes.func
};

// Calendar.defaultProps = {
//     onUpdate: () => {},
//     value: null
// };

export default Calendar;
