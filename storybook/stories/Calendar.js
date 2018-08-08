import React from 'react';
import Orizzonte, { Group } from 'orizzonte';
import Calendar from 'orizzonte-calendar';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withInfo } from '@storybook/addon-info';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withState } from '@dump247/storybook-state';
import moment from 'moment';
import 'orizzonte/dist/orizzonte.min.css';

const stories = storiesOf('Orizzonte Calendar', module);

// eslint-disable-next-line react/prop-types
const component = ({ store }) => {
    const { groups, query } = store.state;

    return (
        <Orizzonte
            query={ query }
            groupTopLabels
            onChange={ (queryObject) => {
                console.log(queryObject);
                store.set({
                    query: queryObject
                });
            }}
            onGroupAdd={ () => {
                console.log('Add group');
            }}
            onGroupRemove={ () => {
                console.log('Remove group');
            }}
        >
            {
                groups.map((group, i) => {
                    const { filters, ...rest } = group;

                    return (
                        <Group
                            key={ `${ group.name }-${ i }` }
                            { ...rest }
                        >
                            { filters }
                        </Group>
                    );
                })
            }
        </Orizzonte>
    );
};

const apiDateFormat = 'YYYY-MM-DD';
const displayFormatShort = 'MMM D, YYYY';
const displayFormatLong = 'MMMM Do, YYYY';

stories.add('Default', withState({
    query: {},
    groups: [{
        included: true,
        label: 'Date range',
        filters: [
            <Calendar
                calendarProps={{
                    numberOfMonths: 2,
                    noBorder: true
                }}
                dateFormat={ apiDateFormat }
                fieldName="daterange"
                key="1"
                selectedLabel={ (value) => {
                    const parts = value.split('__');

                    if (parts.length === 1) {
                        if (value.indexOf('__') === 0) {
                            parts.unshift(null);
                        } else {
                            parts.push(null);
                        }
                    }

                    const dateStart = parts[0] ? moment(parts[0], 'YYYY-MM-DD').format(displayFormatShort) : null;
                    const dateEnd = parts[1] ? moment(parts[1], 'YYYY-MM-DD').format(displayFormatShort) : null;

                    if (!dateStart && dateEnd) {
                        return `Until ${ dateEnd }`;
                    }
                    if (dateStart && !dateEnd) {
                        return `${ dateStart } — now`;
                    }

                    return `${ dateStart } — ${ dateEnd }`;
                }}
                rangeStringSeparator="__"
                range
            />
        ]
    }, {
        included: true,
        label: 'Single date',
        filters: [
            <Calendar
                calendarProps={{
                    noBorder: true
                }}
                dateFormat={ apiDateFormat }
                fieldName="date"
                key="1"
                selectedLabel={ (value) => (
                    value ? moment(value, 'YYYY-MM-DD').format(displayFormatLong) : null
                )}
            />
        ]
    }]
})(
    withInfo()(component)
));
