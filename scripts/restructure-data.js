const readline = require("readline");
const fs = require("fs");
const fontkit = require("fontkit");

const fontCollection = fontkit.openSync("/System/Library/Fonts/PingFang.ttc");
const font = fontCollection.fonts[0];

const reader = readline.createInterface({
  input: fs.createReadStream("src/data/data_table.txt", "utf8"),
});

const lists = {
  hsk1: fs.readFileSync("src/data/hsk1.txt", "utf8"),
  hsk2: fs.readFileSync("src/data/hsk2.txt", "utf8"),
  hsk3: fs.readFileSync("src/data/hsk3.txt", "utf8"),
  hsk4: fs.readFileSync("src/data/hsk4.txt", "utf8"),
};
const listNames = Object.keys(lists);

const comboSets = Object.fromEntries(
  listNames.map((name) => [name, new Map()])
);
const comboSetRest = new Map();

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
    _ordering,
  ] = line.split(" ");

  if (!isChinese) return;

  const codes = v5Codes.split(",");
  for (const code of codes) {
    if (code === "NA") continue;
    if (!font.hasGlyphForCodePoint(traditional.charCodeAt(0))) continue;
    for (const [listName, list] of Object.entries(lists)) {
      if (list.includes(traditional)) {
        const comboSet = comboSets[listName];
        const chars = comboSet.get(code) || new Set();
        chars.add(traditional);
        comboSet.set(code, chars);
        return;
      }
    }
    const chars = comboSetRest.get(code) || new Set();
    chars.add(traditional);
    comboSetRest.set(code, chars);
  }
});

function formatComboSet(comboSet) {
  const out = {};
  for (const [code, chars] of comboSet) {
    out[code] = Array.from(chars).join("");
  }

  return out;
}

reader.on("close", () => {
  const out = {};
  for (const [name, comboSet] of Object.entries(comboSets)) {
    out[name] = formatComboSet(comboSet);
  }
  out.rest = formatComboSet(comboSetRest);

  fs.writeFileSync(`src/data/combos.json`, JSON.stringify(out, null, 2) + "\n");
});
