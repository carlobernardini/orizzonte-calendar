import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: 'startDate'
        };
    }

    render() {
        const { label, onUpdate, value } = this.props;
        const { focusedInput } = this.state;

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
                    startDate={ value ? value.start : null }
                    endDate={ value ? value.end : null }
                    onDatesChange={ ({ startDate, endDate }) => {
                        onUpdate({
                            start: startDate,
                            end: endDate
                        });
                    } }
                    focusedInput={ focusedInput }
                    onFocusChange={ (input) => {
                        this.setState({
                            focusedInput: input || 'startDate'
                        });
                    }}
                    numberOfMonths={ 2 }
                    noBorder
                />
            </div>
        );
    }
}

Calendar.displayName = 'OrizzonteCalendar';

Calendar.propTypes = {
    /** Label for this filter section */
    label: PropTypes.string.isRequired,
    value: PropTypes.shape({
        start: PropTypes.any,
        end: PropTypes.any
    }).isRequired,
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
    onUpdate: PropTypes.func
};

Calendar.defaultProps = {
    onUpdate: () => {},
};

export default Calendar;
