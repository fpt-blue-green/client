export const POST = async (request: Request) => {
  const body = await request.json();
  const token = body.token;

  if (!token) {
    return Response.json({ message: 'Không nhận được token' }, { status: 400 });
  }

  return Response.json(body, {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${5 * 60}`,
    },
  });
};
