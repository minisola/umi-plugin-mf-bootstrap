"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _path() {
  const data = require("path");
  _path = function _path() {
    return data;
  };
  return data;
}
function _fs() {
  const data = require("fs");
  _fs = function _fs() {
    return data;
  };
  return data;
}
var _default = api => {
  api.onGenerateFiles(() => {
    const path = api.env === 'production' ? './src/.umi-production/umi.ts' : './src/.umi/umi.ts';
    const buffer = (0, _fs().readFileSync)((0, _path().resolve)(path));
    const c = String(buffer);
    // 防止热更新重复覆盖
    if (c.includes('const { bootstrap, mount, unmount, update } = await import("./index")')) {
      return;
    }
    api.writeTmpFile({
      path: 'index.ts',
      content: c
    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: `
const { bootstrap, mount, unmount, update } = await import("./index")
export { bootstrap, mount, unmount, update }
      `
    });
  });
};
exports.default = _default;