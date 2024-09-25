import RedisService from '../../../db/connectRedis';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const redisService = new RedisService();

export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    const sessionId = req.headers.authorization?.split(' ')[1];
    const { introduction, fromLocation, toLocation, departureTime, arrivalTime, vehicleType, cargoSpace } = req.body;

    if (!sessionId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const routeId = uuidv4();

    try {
      await redisService.connect();
      // Save driver route information in Redis
      await redisService.set(`driver-route:${routeId}`, JSON.stringify({
        introduction,
        fromLocation,
        toLocation,
        departureTime,
        arrivalTime,
        vehicleType,
        cargoSpace,
        sessionId, // Link to user session
      }));

      return res.status(200).json({
        success: true,
        message: 'Driver route saved',
        routeId,
      });
    } catch (error) {
      console.error('Error saving driver route:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await redisService.disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}