import React from 'react'

const CommonWeatherInformation = ({title="", value=""}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="font-medium text-sm">{title}</div>
            <div className="text-sm text-gray-500"> {value}</div>
        </div>
    )
}

export default CommonWeatherInformation