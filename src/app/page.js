'use client'
import { Loader2Icon } from "lucide-react";
import { Wind } from "lucide-react";
import { DropletOffIcon } from "lucide-react";
import { WindIcon } from "lucide-react";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Sto. Cristo Sur, Gapan City")

  const fetchWeather = async (currentCity) => {
    try {
      const response = await fetch(`/api/weather?city=${currentCity}`)

      if (!response.ok) {
        throw new Error("Network response is not responding.")
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchWeather(city);
  }, [city])

  console.log(weatherData)

  const today = weatherData ? new Date(weatherData.days[0].datetime) : null;
  const option = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today ? today.toLocaleDateString('en-US', option) : '';

  return (
    <div className="h-screen w-screen bg-[#0f0f0f] p-10 flex flex-col gap-10">
      <div className="flex justify-center items-center flex-wrap gap-1 md:gap-5 md:mb-10">
        <div className="flex items-center justify-center gap-1">
          <span className="text-secondary text-xs md:text-sm">
            {weatherData ? weatherData.address : <Loader2Icon className="animate-spin" />}
          </span>
        </div>
        <div className="">
          <span className="text-secondary opacity-80 text-xs md:text-sm">
            {formattedDate ? <>({formattedDate})</> : null}
          </span>
        </div>
      </div>
      {/*main content */}
      <div className="p-3 flex flex-wrap justify-center items-start flex-col gap-7">
        <div className="flex justify-start">
          <h1 className="text-secondary text-7xl md:text-8xl">
            {weatherData && weatherData.currentConditions.temp}
          </h1>
          <span className="text-secondary text-2xl font-semibold">
            °C
          </span>
        </div>
        <div>
          <h2 className="text-secondary text-3xl md:text-5xl font-light capitalize">
            {weatherData && weatherData.currentConditions.conditions}
          </h2>
        </div>
        <div className="flex gap-10">
          <div>
            <h1 className="text-secondary flex items-center justify-start gap-1">
              <Wind className="opacity-80 text-secondary h-4" />
              <span className="opacity-80">Wind</span>
            </h1>
            <span className="text-secondary text-xl md:text-3xl">
              {weatherData && weatherData.currentConditions.windspeed}km/h
            </span>
          </div>
          <div>
            <h1 className="text-secondary flex items-center justify-start gap-1">
              <DropletOffIcon className="text-secondary opacity-80 h-4" />
              <span className="opacity-80">Humidity</span>
            </h1>
            <span className="text-secondary text-xl md:text-3xl">
              {weatherData && weatherData.currentConditions.humidity} %
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}