type User = {
  id: number;
  name: string;
  email: string;
  image?: string;
  token: string;
  refreshToken: string;
};

export default User;
