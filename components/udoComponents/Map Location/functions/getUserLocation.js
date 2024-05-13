export const GetUserLocation = (SetOrigin)=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude:lat, longitude:lng } = position.coords
            SetOrigin({ lat, lng })
           },
          (error) => {
            console.log(error)
            //  toast.error(
            //   language === 'en'
            //     ? 'You Have To Enable Your Location Please'
            //     : ' يجب عليك تمكين موقعك من فضلك'
            // )
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
}