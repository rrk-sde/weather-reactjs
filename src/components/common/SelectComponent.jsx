import React from 'react';
import citiesData from '../data/cities.json';

const SelectComponent = ({ data, handleOptionChange, isLoading }) => {
    return (
        <select disabled={isLoading}
            className="box select_option border w-full p-2 text-center rounded focus:outline-blue focus:border-blue-500 appearance-none border-blue-400   bg-no-repeat bg-right bg-contain"
            name="city"
            onChange={(e) => handleOptionChange(e)}
            value={data.city}
        >
            {citiesData.map(city => (
                <option key={city.value} value={city.value} className="text-blue-500 px-2 py-4 uppercase" style={{ borderTop: '1px solid gray' }}>
                    {city.label}
                </option>
            ))}
        </select>
    );
};

export default SelectComponent;
