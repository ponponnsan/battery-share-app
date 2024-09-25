import RedisService from '../../../db/connectRedis';
import { Request, Response } from 'express';

const redisService = new RedisService();

export default async function handler(req: Request, res: Response) {
  const { routeId } = req.query;

  if (req.method === 'GET') {
    const sessionId = req.headers.authorization?.split(' ')[1];

    if (!sessionId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      await redisService.connect();
      const driverRoute = await redisService.get(`driver-route:${routeId}`);

      if (!driverRoute) {
        return res.status(404).json({ message: 'Driver route not found' });
      }

      return res.status(200).json(JSON.parse(driverRoute));
    } catch (error) {
      console.error('Error fetching driver route:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await redisService.disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
Summary
This setup implements the following functionalities:

User Authentication







