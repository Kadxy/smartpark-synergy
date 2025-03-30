interface ParkingLocation {
  lat: number;
  lng: number;
}

interface ParkingLot {
  id: number;
  name: string;
  location: ParkingLocation;
  totalSpaces: number;
  hourlyRate: number;
  distance: number; // 模拟距离(米)
}

// 停车场基础数据
export const parkingLots: ParkingLot[] = [
  {
    id: 1,
    name: "A区停车场",
    location: { lat: 39.7283, lng: 116.1452 },
    totalSpaces: 150,
    hourlyRate: 5,
    distance: 200 // 模拟距离(米)
  },
  {
    id: 2,
    name: "B区停车场",
    location: { lat: 39.7291, lng: 116.1461 },
    totalSpaces: 80,
    hourlyRate: 3,
    distance: 600 // 模拟距离(米)
  },
  {
    id: 3,
    name: "C区地下停车场",
    location: { lat: 39.7276, lng: 116.1448 },
    totalSpaces: 200,
    hourlyRate: 6,
    distance: 350 // 模拟距离(米)
  },
  {
    id: 4,
    name: "D区路边停车位",
    location: { lat: 39.7289, lng: 116.1442 },
    totalSpaces: 30,
    hourlyRate: 2,
    distance: 800 // 模拟距离(米)
  },
  {
    id: 5,
    name: "E区商业中心停车场",
    location: { lat: 39.7265, lng: 116.1439 },
    totalSpaces: 120,
    hourlyRate: 8,
    distance: 950 // 模拟距离(米)
  }
]; 