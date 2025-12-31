const getLocation = async () => {
  
  if (!navigator.geolocation) return Promise.reject('Геолокация не поддерживается')
  // Если геолокация поддерживается браузером
  return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        resolve(coords)
      }, (error) => reject(`Ошибка геолокации: ${error.message}`))
  })
}

export default getLocation