const readline = require("readline");
const fs = require("fs");

const reader = readline.createInterface({
  input: fs.createReadStream("src/data/data_table.txt", "utf8"),
});

const layouts = new Map();

reader.on("line", (line) => {
  if (!line || line.startsWith("#")) {
    return;
  }
  const [
    traditional,
    _simplified,
    isChinese,
    _isBig5,
    _isHkscs,
    _isZhuyin,
    _isKanji,
    _isHiragana,
    _isKatakana,
    _isPunc,
    _isMisc,
    _v3Codes,
    v5Codes,
    _shortCode,
    ordering,
  ] = line.split(" ");

  if (!isChinese) return;

  const codes = v5Codes.split(",");
  for (const code of codes) {
    if (code === "NA") continue;
    const key = code[code.length - 1];
    const scope = code.substring(0, code.length - 1);
    const layout = layouts.get(scope) || new Map();
    const chars = layout.get(key) || [];
    if (chars.find((x) => x.traditional === traditional)) {
      continue;
    }
    chars.push({ traditional, ordering });
    layout.set(key, chars);
    layouts.set(scope, layout);
  }
});

reader.on("close", () => {
  const trimmedLayouts = {};
  for (const [scope, layout] of layouts) {
    for (const [key, chars] of layout) {
      if (chars.length > 1) {
        console.log("code clash:", scope, key, chars);
      }
    }
    const out = {};
    const keys = Array.from(layout.keys()).sort();
    for (const key of keys) {
      if (!layout.get(key)) {
        console.log("missing?", scope, key, layout);
        continue;
      }
      out[key] = layout.get(key).map((x) => x.traditional);
    }
    trimmedLayouts[scope] = out;
  }
  fs.writeFileSync(
    `src/data/layouts.json`,
    JSON.stringify(trimmedLayouts, null, 2) + "\n"
  );
});
