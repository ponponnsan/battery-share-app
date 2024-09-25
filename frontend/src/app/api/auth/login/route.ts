import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL });

export async function POST(request: NextRequest) {
  const { name, id, image } = await request.json();

  try {
    await redisClient.connect();
    const sessionId = Math.random().toString(36).substring(2, 15);
    await redisClient.hSet(`user:${sessionId}`, { name, id, image });
    await redisClient.disconnect();

    const response = NextResponse.json({ success: true, message: 'Login successful', sessionId });
    response.cookies.set('sessionId', sessionId, { httpOnly: true, maxAge: 3600 });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
