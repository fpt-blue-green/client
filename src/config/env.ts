import { z } from 'zod';

const configSchema = z.object({
  API_ENDPOINT: z.string(),
  REFRESH_TIME: z.string(),
});

const configProject = configSchema.safeParse({
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  REFRESH_TIME: process.env.NEXT_PUBLIC_REFRESH_TIME,
});
if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

const env = configProject.data;
export default env;
