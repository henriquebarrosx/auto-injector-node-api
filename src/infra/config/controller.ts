import fs from 'fs';
import path from 'path';
import { RequestType } from '../adapters/http-server/types';

interface ModuleExports {
  [key: string]: any;
}

export type HttpVerbDecoratorPayload = {
  method: RequestType;
  endpoint: string;
  callback: any;
}

function collectExports(dir: string): ModuleExports {
  const files = fs.readdirSync(dir);
  const exports: ModuleExports[] = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isFile() && file.endsWith('.ts')) {
      const module: ModuleExports = require(filePath);

      Object.keys(module).forEach(key => {
        if (key !== 'default') {
          exports.push(module[key])
        }
      });
    }
  });

  return exports;
}

const controllersDir = path.join(__dirname, '..', '..', 'app', 'controllers');
export const controllers = collectExports(controllersDir);