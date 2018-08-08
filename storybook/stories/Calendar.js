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

stories.add('Default', withState({
    query: {},
    groups: [{
        included: true,
        label: 'Date range',
        filters: [
            <Calendar
                fieldName="daterange"
                key="daterange"
                label="Select a date range"
                selectedLabel={ (value) => {
                    const dateStart = value.start ? moment(value.start, 'YYYY-MM-DD').format('MMM D, YYYY') : null;
                    const dateEnd = value.end ? moment(value.end, 'YYYY-MM-DD').format('MMM D, YYYY') : null;

                    if (!dateStart && dateEnd) {
                        return `Until ${ dateEnd }`;
                    }
                    if (dateStart && !dateEnd) {
                        return `${ dateStart } - now`;
                    }

                    return `${ dateStart } - ${ dateEnd }`;
                }}
                range
            />
        ]
    }, {
        included: true,
        label: 'Single date',
        filters: [
            <Calendar
                fieldName="date"
                key="date"
                label="Select a date"
                selectedLabel={ (value) => (
                    value ? moment(value, 'YYYY-MM-DD').format('MMMM Do, YYYY') : null
                )}
            />
        ]
    }]
})(
    withInfo()(component)
));
