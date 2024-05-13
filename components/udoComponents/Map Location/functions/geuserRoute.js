export const GenUserRoute= async(origin,destination)=>{
    if(origin===""&&distance===""){
        return
    }

    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
        origin,
        destination,
        travelMode:google.maps.TravelMode.DRIVING
    });
    
} 