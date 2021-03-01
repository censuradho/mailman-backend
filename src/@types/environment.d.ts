
declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    JWT_SECRET: string
  }
}

module.exports = {}
