import RedisService from '../../../db/connectRedis';
import { Request, Response } from 'express';

const redisService = new RedisService();

export default async function handler(req: Request, res: Response) {
  const { requestId } = req.query;

  if (req.method === 'GET') {
    const sessionId = req.headers.authorization?.split(' ')[1];

    if (!sessionId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      await redisService.connect();
      const deliveryRequest = await redisService.get(`delivery-request:${requestId}`);

      if (!deliveryRequest) {
        return res.status(404).json({ message: 'Delivery request not found' });
      }

      return res.status(200).json(JSON.parse(deliveryRequest));
    } catch (error) {
      console.error('Error fetching delivery request:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await redisService.disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}