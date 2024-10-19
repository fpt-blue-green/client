import { z } from 'zod';

const configSchema = z.object({
  API_ENDPOINT: z.string(),
});

const configProject = configSchema.safeParse({
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
if (!configProject.success) {
  // eslint-disable-next-line no-console
  console.error(configProject.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

const env = configProject.data;
export default env;
