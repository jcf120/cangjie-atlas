import combos from "./combos.json";

export type Dict = Record<string, string>;

const qwertyToCangjie: Dict = {
  q: "手",
  w: "田",
  e: "水",
  r: "口",
  t: "廿",
  y: "卜",
  u: "山",
  i: "戈",
  o: "人",
  p: "心",
  a: "日",
  s: "尸",
  d: "木",
  f: "火",
  g: "土",
  h: "竹",
  j: "十",
  k: "大",
  l: "中",
  z: "重",
  x: "難",
  c: "金",
  v: "女",
  b: "月",
  n: "弓",
  m: "一",
};

const cangjieToQwerty: Dict = Object.fromEntries(
  Object.entries(qwertyToCangjie).map(([k, v]) => [v, k])
);

export function getCangjieKey(qwertyKey: string) {
  return qwertyToCangjie[qwertyKey] ?? "";
}

function getQwertyKey(cangjieKey: string) {
  if (cangjieKey === "　") return "z";
  if (cangjieKey === "已") return "x";
  return cangjieToQwerty[cangjieKey] ?? "";
}

export function cangjieComposeDataToCode(data: string) {
  return data.split("").map(getQwertyKey).join("");
}

export interface Opts {
  hsk1: boolean;
  hsk2: boolean;
  hsk3: boolean;
  hsk4: boolean;
  rest: boolean;
}

export const defaultOpts = {
  hsk1: true,
  hsk2: true,
  hsk3: true,
  hsk4: true,
  rest: true,
};

function appendCombos(x: Dict, y: Dict) {
  for (const k in y) {
    let chars = x[k] ?? "";
    chars += y[k];
    x[k] = chars;
  }
}

function getCombos(opts: Opts) {
  const out: Dict = {};
  if (opts.hsk1) appendCombos(out, combos.hsk1);
  if (opts.hsk2) appendCombos(out, combos.hsk2);
  if (opts.hsk3) appendCombos(out, combos.hsk3);
  if (opts.hsk4) appendCombos(out, combos.hsk4);
  if (opts.rest) appendCombos(out, combos.rest);
  return out;
}

export const row1Keys = Array.from("qwertyuiop");
export const row2Keys = Array.from("asdfghjkl");
export const row3Keys = Array.from("zxcvbnm");

const allKeys = [...row1Keys, ...row2Keys, ...row3Keys];
const maxCodeLength = 5;

function fromBaseQwerty(code: string) {
  let x = 0;
  for (let i = 0; i < code.length; i++) {
    x += (maxCodeLength - i) * (allKeys.indexOf(code[i]) + 1);
  }
  return x;
}

function calcCacheKey(opts: Opts) {
  return Object.entries(opts)
    .map(([k, v]) => `${k}:${v}`)
    .join(",");
}

type DataPair = [Dict, string[]];

const dataCache: Record<string, DataPair> = {};

export function getData(opts: Opts): DataPair {
  const cacheKey = calcCacheKey(opts);
  if (dataCache[cacheKey]) return dataCache[cacheKey];
  const combos = getCombos(opts);
  const sortedCodes = Object.keys(combos).sort(
    (x1, x2) => fromBaseQwerty(x1) - fromBaseQwerty(x2)
  );
  const data: DataPair = [combos, sortedCodes];
  dataCache[cacheKey] = data;
  return data;
}
