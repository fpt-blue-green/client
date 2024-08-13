type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  [key: string]: string | number;
};
export default User;
