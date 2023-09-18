import React from 'react';

const MySelect = ({options, defaultOption, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option disabled value=''>{defaultOption}</option>
            {options.map(option =>
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;