export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position: ", position);
        //const { latitude, longitude } = position.coords;
        resolve([-77.0065169, -12.0014033]);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
