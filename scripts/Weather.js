import getWeatherAPI from "./getWeatherAPI.js";
import getLocation from "./getLocation.js";

class Weather {
  selectors = {
    root: '[data-js-root]',
    form: '[data-js-form]',
    input: '[data-js-input]',
    location: '[data-js-location]',
    currentData: '[data-js-data]',
    imageWeather: '[data-js-image-weather]',
    temperature: '[data-js-temperature]',
    weatherConditions: '[data-js-weather-conditions]',
    humidity: '[data-js-humidity]',
    windSpeed: '[data-js-wind-speed]',
    carousel: '[data-js-carousel]',
    carouselItem: '[data-js-carousel-item]',
    carouselData: '[data-js-carousel-data]',
    carouselImage: '[data-js-carousel-image]',
    carouselTemperature: '[data-js-carousel-temperature]',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.form = this.rootElement.querySelector(this.selectors.form)
    this.input = this.rootElement.querySelector(this.selectors.input)
    this.location = this.rootElement.querySelector(this.selectors.location)
    this.currentData = this.rootElement.querySelector(this.selectors.currentData)
    this.imageWeather = this.rootElement.querySelector(this.selectors.imageWeather)
    this.temperature = this.rootElement.querySelector(this.selectors.temperature)
    this.weatherConditions = this.rootElement.querySelector(this.selectors.weatherConditions)
    this.humidity = this.rootElement.querySelector(this.selectors.humidity)
    this.windSpeed = this.rootElement.querySelector(this.selectors.windSpeed)
    this.carousel = this.rootElement.querySelector(this.selectors.carousel)
    this.carouselItem = this.rootElement.querySelector(this.selectors.carouselItem)
    this.isWeatherLoaded = false
    this.data1 = null
    this.data2 = null
    this.init()
  }

  async init() {
    if (this.isWeatherLoaded) return

    const data = await getLocation()

    const [data1, data2] = await getWeatherAPI({coord: data})

    this.data1 = data1
    this.data2 = data2

    this.isWeatherLoaded = true

    this.updateUI()
    this.render()
    this.bindEvents()
  }

  filterWeather() {
    return this.data2.list.filter((array) => {
      return array.dt_txt.includes('12:00:00')
    })
  }

  render() {
    const fourthDays = this.filterWeather()

    fourthDays.forEach((element) => {
      const clone = this.carouselItem.content.cloneNode(true)
      const seconds = element.dt

      const date = new Date(seconds * 1000)
      const monthName = date.toLocaleDateString('ru-RU', { month: 'short'})
      const shortMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1, monthName.length - 1)
      const day = date.toLocaleDateString('ru-RU', {day: '2-digit'})

      clone.querySelector(this.selectors.carouselData).textContent = `${shortMonthName} ${day}`

      if (element.weather[0].main === 'Atmosphere') {
        clone.querySelector(this.selectors.carouselImage).src = "./assets/weather/atmosphere.svg"
      }
      if (element.weather[0].main === 'Clear') {
        clone.querySelector(this.selectors.carouselImage).src = "./assets/weather/clear.svg"
      }
      if (element.weather[0].main === 'Clouds') {
        clone.querySelector(this.selectors.carouselImage).src = "./assets/weather/clouds.svg"
      }
      if (element.weather[0].main === 'Drizzle') {
        clone.querySelector(this.selectors.carouselImage).src = "./assets/weather/drizzle.svg"
      }
      if (element.weather[0].main === 'Rain') {
        clone.querySelector(this.selectors.carouselImage).src = "./assets/weather/rain.svg"
      }
      if (element.weather[0].main === 'Snow') {
        clone.querySelector(this.selectors.carouselImage).src = "./assets/weather/snow.svg"
      }
      if (element.weather[0].main === 'Thunderstorm') {
        clone.querySelector(this.selectors.carouselImage).src = "./assets/weather/thunderstorm.svg"
      }

      clone.querySelector(this.selectors.carouselTemperature).textContent = Math.floor(element.main.temp)

      this.carousel.appendChild(clone)
      console.log(element)
    })
  }

  bindEvents() {
    this.form.addEventListener('submit', this.onSubmit)
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const inputValue = this.input.value
    const [data1, data2] = await getWeatherAPI({city: inputValue})
    this.data1 = data1
    this.data2 = data2
    this.carousel.innerHTML = ''
    this.updateUI()
    this.render()
  }

  updateUI() {
    this.location.textContent = this.data1.name
    this.currentData.textContent = this.date()

    if (this.data1.weather[0].main === 'Atmosphere') {
      this.imageWeather.src = "./assets/weather/atmosphere.svg"
    }
    if (this.data1.weather[0].main === 'Clear') {
      this.imageWeather.src = "./assets/weather/clear.svg"
    }
    if (this.data1.weather[0].main === 'Clouds') {
      this.imageWeather.src = "./assets/weather/clouds.svg"
    }
    if (this.data1.weather[0].main === 'Drizzle') {
      this.imageWeather.src = "./assets/weather/drizzle.svg"
    }
    if (this.data1.weather[0].main === 'Rain') {
      this.imageWeather.src = "./assets/weather/rain.svg"
    }
    if (this.data1.weather[0].main === 'Snow') {
      this.imageWeather.src = "./assets/weather/snow.svg"
    }
    if (this.data1.weather[0].main === 'Thunderstorm') {
      this.imageWeather.src = "./assets/weather/thunderstorm.svg"
    }

    this.temperature.textContent = Math.floor(this.data1.main.temp)
    this.weatherConditions.textContent = this.data1.weather[0].description
    this.humidity.textContent = this.data1.main.humidity
    this.windSpeed.textContent = this.data1.wind.speed
  }

  date () {
    const today = new Date()

    const monthName = today.toLocaleDateString('ru-RU', { month: 'short'})
    const shortMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1, monthName.length - 1)
    const day = today.toLocaleDateString('ru-RU', {day: '2-digit'})
    const weekday = today.toLocaleDateString('ru-RU', {weekday: 'short'})
    const shortWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)

    return `${shortWeekday}, ${day} ${shortMonthName}`
  }

}

export default Weather