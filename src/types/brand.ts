interface IBrand {
  id: string;
  userId: string;
  name: string;
  address: string;
  isPremium: boolean;
  description?: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export default IBrand;
