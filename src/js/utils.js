export const getCoordinatesFromInput = (text) => {
  let coordinates = text.split(",");
  if (coordinates.length !== 2) {
    throw new Error("Invalid coordinates");
  }
  coordinates = coordinates.map((item) => item.trim());
  return {
    latitude: coordinates[0],
    longitude: coordinates[1],
  };
};
