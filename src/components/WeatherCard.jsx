import React from 'react'

const WeatherCard = ({ data }) => {
    return (
        <div>
            <div className="relative px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        {data?.name && <h5 className="mb-0 text-xl font-medium text-white">{data?.name}</h5>}
                        <h6 className="mb-0 text-white">April 04 2021</h6>
                    </div>
                    <div className="text-right">
                        <h3 className="mb-0 text-4xl font-bold text-white"><span>{Math.round(data?.main?.temp)}&deg;</span></h3>
                    </div>
                </div>
                <div className="text-white flex-wrap items-center justify-between block sm:flex">
                    <div className="w-full sm:w-1/2">
                        <div className="flex items-center justify-between mb-2"><span>Temp</span><small className="inline-block px-2">
                            {Math.round(data?.main?.temp)}&nbsp;&deg;</small>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <div className="flex items-center justify-between mb-2"><span>Feels like</span><small className="inline-block px-2">{Math.round(data?.main?.feels_like)}&nbsp;&deg;</small></div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <div className="flex items-center justify-between mb-2"><span>Temp min</span><small className="inline-block px-2">{Math.round(data?.main?.temp_min)}&nbsp;&deg;</small></div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <div className="flex items-center justify-between mb-2"><span>Temp max</span><small className="inline-block px-2">{Math.round(data?.main?.temp_max)}&nbsp;&deg;</small></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard