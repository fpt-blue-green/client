import { z } from 'zod';

const configSchema = z.object({
  API_ENDPOINT: z.string(),
  HUB_ENDPOINT: z.string(),
  BANK_LOOKUP_KEY: z.string(),
  BANK_LOOKUP_SECRET: z.string(),
});

const configProject = configSchema.safeParse({
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  HUB_ENDPOINT: process.env.NEXT_PUBLIC_HUB_ENDPOINT,
  BANK_LOOKUP_KEY: process.env.NEXT_PUBLIC_BANK_LOOKUP_KEY,
  BANK_LOOKUP_SECRET: process.env.NEXT_PUBLIC_BANK_LOOKUP_SECRET,
});
if (!configProject.success) {
  // eslint-disable-next-line no-console
  console.error(configProject.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

const env = configProject.data;
export default env;
