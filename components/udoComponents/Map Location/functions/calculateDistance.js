  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = radians(lat2 - lat1);
    const dLon = radians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(radians(lat1)) * Math.cos(radians(lat2)) *
             Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  
  function radians(degrees) {
    return degrees * Math.PI / 180;
  }
  function findNearestLocation(yourLat, yourLng, locations) {
    let nearestLocation = null;
    let nearestDistance = Infinity;
  
    locations.forEach((location) => {
      const distance = calculateDistance(yourLat, yourLng, location.lat, location.lng);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLocation = location;
      }
    });
  
    return nearestLocation;
  }
  export {findNearestLocation,calculateDistance}