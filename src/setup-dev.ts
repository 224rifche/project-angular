// src/setup-env.ts
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const env = dotenv.parse(fs.readFileSync('.env'));

for (const key in env) {
  process.env[key] = env[key];
}