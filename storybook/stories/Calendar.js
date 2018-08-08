import React from 'react';
import Orizzonte, { Group } from 'orizzonte';
import Calendar from 'orizzonte-calendar';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withInfo } from '@storybook/addon-info';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withState } from '@dump247/storybook-state';

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
        label: 'Dates',
        filters: [
            <Calendar
                fieldName="daterange"
                key="daterange"
                label="Date range"
                selectedLabel="%s (Primary)"
            />
        ]
    }]
})(
    withInfo()(component)
));
