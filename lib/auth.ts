import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(request?: NextRequest) {
  const token = request 
    ? request.cookies.get('auth-token')?.value 
    : cookies().get('auth-token')?.value;
    
  if (!token) return null;
  
  return await verifyToken(token);
}

export async function requireRole(request: NextRequest, role: string) {
  const session = await getSession(request);
  if (!session) return false;
  if (session.role !== role) return false;
  return true;
}
