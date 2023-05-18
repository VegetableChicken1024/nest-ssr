import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import { getEnv } from './env';

export const getConfig = () => {
  const yamlPath = join(process.cwd(), '.configs', `${getEnv()}.yaml`);
  return parse(readFileSync(yamlPath, 'utf8'));
};
