import React from 'react';
import citiesData from '../data/cities.json';

const SelectComponent = ({ data, handleOptionChange, isLoading }) => {
    return (
        <div className='relative'>
            <svg className="text-white z-40 w-6 h-6 bg-blue-700 absolute top-0 right-0 m-2 pointer-events-none p-2 rounded" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 38 22" version="1.1">
                <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
                <g id="ZahnhelferDE—Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="ZahnhelferDE–Icon&amp;Asset-Download" transform="translate(-539.000000, -199.000000)" fill="#ffffff" fill-rule="nonzero">
                        <g id="Icon-/-ArrowRight-Copy-2" transform="translate(538.000000, 183.521208)">
                            <polygon id="Path-Copy" transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) " points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631" />
                        </g>
                    </g>
                </g>
            </svg>

            <select disabled={isLoading}
                className="text-md font-semibold rounded border-2 border-purple-700 text-gray-600 h-10 w-60 pl-2 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                name="city"
                onChange={(e) => handleOptionChange(e)}
                value={data.city}
            >
                {citiesData.map(city => (
                    <option key={city.value} value={city.value} className="md:text-md text-blue-500 px-2 py-4 uppercase" >
                        {city.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectComponent;
