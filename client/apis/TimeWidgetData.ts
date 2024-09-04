import request from 'superagent'
import { WeatherData } from '../../models/WeatherData'

const apiKey = '98d4af4361c75cb1681c74f25944de42'

export default async function getWeatherData(
  lat: number,
  lng: number
): Promise<WeatherData> {
  try {
    const res = await request.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
    )
    //  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API key}`

    const weatherData = res.body

    const sunrise = new Date(
      weatherData.sys.sunrise * 1000
    ).toLocaleTimeString()
    const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()

    const currentTime = new Date().toLocaleTimeString()

    return {
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
      name: weatherData.name,
      sunrise,
      sunset,
      currentTime,
    }
  } catch (error) {
    console.error('Error fetching weather data', error)
    throw error
  }
}
