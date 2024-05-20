const getLatLngFromAddress = async (city, stadium) => {
    const apiKey = 'AIzaSyDXc7ZP3aGnac7IGxoOmNaO09-hmQWgzIw'; // Google Haritalar API anahtarınızı buraya ekleyin
    const address = `${stadium} stadium, ${city}`;
  
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        return { latitude, longitude };
      } else {
        console.error('No results found for the given address');
        return null;
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  };

export default getLatLngFromAddress;