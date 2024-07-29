import http from '@/lib/http';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const getData = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    const res = await http.get('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    return res.payload;
  } catch {
    return notFound();
  }
};

const Account = async () => {
  const user = await getData();

  console.log(user);

  return <div>Account</div>;
};

export default Account;
