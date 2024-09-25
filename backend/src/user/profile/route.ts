import { Router } from 'express';
import RedisService from '../../db/connectRedis'; // RedisServiceの正しいパスを設定

const userProfileRoutes = Router();
const redisService = new RedisService();

userProfileRoutes.post('/profile', async (req, res) => {
  const { name, id, image } = req.body;

  // await redisService.connect();
  await redisService.set(`user:${id}`, JSON.stringify({ name, id, image }));
  // await redisService.disconnect();

  return res.json({ success: true, message: "User profile saved" });
});

userProfileRoutes.get('/profile', async (req, res) => {
  const { id } = req.query;

  await redisService.connect();
  const userProfile = await redisService.get(`user:${id}`);
  await redisService.disconnect();

  if (userProfile) {
    return res.json(JSON.parse(userProfile));
  } else {
    return res.status(404).json({ success: false, message: "User not found" });
  }
});

export default userProfileRoutes;
