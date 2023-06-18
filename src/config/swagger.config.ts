import { registerAs } from '@nestjs/config';

export default registerAs('swagger', async () => {
  return {
    user: process.env.SWAGGER_USER || 'fastcampus',
    password: process.env.SWAGGER_PASSWORD || 'fastcampus',
  };
});
