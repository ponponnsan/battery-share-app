import RedisService from '../../../db/connectRedis';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const redisService = new RedisService();

export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    const sessionId = req.headers.authorization?.split(' ')[1];
    const { pickupLocation, deliveryLocation, preferredTime, cargoSize } = req.body;

    if (!sessionId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const requestId = uuidv4();

    try {
      await redisService.connect();
      // Save delivery request in Redis
      await redisService.set(`delivery-request:${requestId}`, JSON.stringify({
        pickupLocation,
        deliveryLocation,
        preferredTime,
        cargoSize,
        sessionId, // Link to user session
      }));

      return res.status(200).json({
        success: true,
        message: 'Delivery request saved',
        requestId,
      });
    } catch (error) {
      console.error('Error saving delivery request:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await redisService.disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}