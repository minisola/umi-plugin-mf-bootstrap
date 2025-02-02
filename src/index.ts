import { IApi } from '@umijs/types';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    const path =
      api.env === 'production'
        ? './src/.umi-production/umi.ts'
        : './src/.umi/umi.ts';
    const buffer = readFileSync(resolve(path));
    const c = String(buffer);
    // 防止热更新重复覆盖
    if(c.includes('const { bootstrap, mount, unmount, update } = await import("./index")')){
      return
    }
    api.writeTmpFile({
      path: 'index.ts',
      content: c,
    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: `
const { bootstrap, mount, unmount, update } = await import("./index")
export { bootstrap, mount, unmount, update }
      `,
    });
  });
};
