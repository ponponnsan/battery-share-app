import { Router } from 'express';
import RedisService from '../../db/connectRedis'; // Redis接続

const deliveryRoutes = Router();
const redisService = new RedisService();

deliveryRoutes.post('/request', async (req, res) => {
  const { pickupLocation, deliveryLocation, preferredTime, cargoSize } = req.body;

  await redisService.connect();
  const requestId = `${Date.now()}`;
  await redisService.set(requestId, JSON.stringify({ pickupLocation, deliveryLocation, preferredTime, cargoSize }));
  await redisService.disconnect();

  return res.json({ success: true, message: "Delivery request saved", requestId });
});

deliveryRoutes.get('/request/:requestId', async (req, res) => {
  const { requestId } = req.params;

  await redisService.connect();
  const deliveryRequest = await redisService.get(requestId);
  await redisService.disconnect();

  if (deliveryRequest) {
    return res.json(JSON.parse(deliveryRequest));
  } else {
    return res.status(404).json({ success: false, message: "Delivery request not found" });
  }
});

export default deliveryRoutes;