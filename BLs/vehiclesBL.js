const fileDAL = require('../DALs/vehiclesFileDal');

const getVehiclesData =  async () =>
{
    let vehicles = await fileDAL.getVehicles();
    return vehicles
}

const getVehiclesInPolygons = async (body) =>
{
    const { polygons } = body;

    let vehiclesInPolygon = []
    let vehicles = await fileDAL.getVehicles();

    polygons.forEach((polygon) => {
        vehiclesInPolygon = [...vehiclesInPolygon, ...getVehiclesInSinglePolygon(polygon, vehicles)];
        vehiclesInPolygon = filterDuplicates(vehiclesInPolygon, 'id')
    });

    return vehiclesInPolygon;
}

const filterDuplicates = (arr, key) => {
    const uniqueItems = {};
    return arr.filter(item => {
      const value = item[key];
      if (!uniqueItems[value]) {
        uniqueItems[value] = true;
        return true;
      }
      return false;
    });
  }

  const getVehiclesInSinglePolygon = ( polygon, vehicles ) => {
    const vehiclesInPolygon = vehicles.filter((vehicle) => {
      const { location } = vehicle;
      return pointInPolygon(location, polygon);
    });
    return vehiclesInPolygon;
  };

  const pointInPolygon = ( point, polygon ) => {
    if (!point || !polygon) return false;
    const x = point.lng;
    const y = point.lat;
    let isInside = false;
  
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const x1 = polygon[i].lng;
      const y1 = polygon[i].lat;
      const x2 = polygon[j].lng;
      const y2 = polygon[j].lat;
  
      const intersect = y1 > y !== y2 > y && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;
      if (intersect) {
        isInside = !isInside;
      }
    }
  
    return isInside;
  };

module.exports = {getVehiclesData, getVehiclesInPolygons}