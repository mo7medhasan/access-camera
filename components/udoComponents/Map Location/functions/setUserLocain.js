export async function getAddressFromCoords(lat, lng) {
    const url = 
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCP0_tqmPq6vtAnbrTJnKFvCls9OagH3G4`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching address: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        return address;
      } else {
        console.error('Error fetching address:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
  }
  