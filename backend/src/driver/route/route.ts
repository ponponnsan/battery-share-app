import { Router } from 'express';
import RedisService from '../../db/connectRedis';

const driverRoutes = Router();
const redisService = new RedisService();

driverRoutes.post('/route', async (req, res) => {
  const { introduction, fromLocation, toLocation, departureTime, arrivalTime, vehicleType, cargoSpace } = req.body;

  await redisService.connect();
  const routeId = `${Date.now()}`;
  await redisService.set(routeId, JSON.stringify({ introduction, fromLocation, toLocation, departureTime, arrivalTime, vehicleType, cargoSpace }));
  await redisService.disconnect();

  return res.json({ success: true, message: "Driver route saved", routeId });
});

driverRoutes.get('/route/:routeId', async (req, res) => {
  const { routeId } = req.params;

  await redisService.connect();
  const driverRoute = await redisService.get(routeId);
  await redisService.disconnect();

  if (driverRoute) {
    return res.json(JSON.parse(driverRoute));
  } else {
    return res.status(404).json({ success: false, message: "Driver route not found" });
  }
});

export default driverRoutes;
