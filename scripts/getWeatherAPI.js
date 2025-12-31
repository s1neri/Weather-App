const getWeatherAPI = async (params = {}) => {
  try {

    let url1 = null
    let url2 = null

      if (params.coord) {
        console.log(params.coord)
        url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${params.coord.lat}&lon=${params.coord.lon}&units=metric&lang=ru&appid=20ef360826e9fa2a5114b5eb765aae72`
        url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${params.coord.lat}&lon=${params.coord.lon}&units=metric&cnt=32&lang=ru&appid=20ef360826e9fa2a5114b5eb765aae72`
      } else if (params.city) {
        console.log(params.city)
        url1 = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&units=metric&lang=ru&appid=20ef360826e9fa2a5114b5eb765aae72`
        url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&units=metric&cnt=32&lang=ru&appid=20ef360826e9fa2a5114b5eb765aae72`
      }

    const response1 = await fetch(url1)
    const response2 = await fetch(url2)

    if (!response1.ok || !response2.ok) throw new Error('Ошибка')

    const data1 = await response1.json()
    const data2 = await response2.json()

    return [data1, data2]
  } catch (error) {
    console.log(error)
  }
}

export default getWeatherAPI