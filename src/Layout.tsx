import React, { useEffect, useRef, useState } from "react";
import {
  Dict,
  getCangjieKey,
  row1Keys,
  row2Keys,
  row3Keys,
  getCodesForChar,
} from "./model";
import style from "./Layout.module.css";

function gather(
  combos: Dict,
  sortedCodes: string[],
  scope: string,
  limit: number
) {
  let out = "";
  for (const code of sortedCodes) {
    if (code.startsWith(scope) && code !== scope) {
      out += combos[code];
      if (out.length >= limit) return out.substring(0, limit);
    }
  }
  return out;
}

function renderKey(
  combos: Dict,
  sortedCodes: string[],
  scope: string,
  cap: string,
  unit: number,
  charLimit: number,
  targetCodes: string[]
) {
  const chars = combos[scope] ?? "";
  const targeted = !!targetCodes.find((x) => x.startsWith(scope));
  return (
    <div
      key={cap}
      className={style.key + (targeted ? ` ${style.targeted}` : "")}
      style={{ width: unit, height: unit * 1.1 }}
    >
      <div className={style.keyBg} style={{ fontSize: unit * 0.8 }}>
        {getCangjieKey(cap)}
      </div>
      <div className={style.keyFg} style={{ width: unit, height: unit * 1.1 }}>
        <span>{chars.substring(0, charLimit)}</span>
        <span style={{ opacity: 0.5 }}>
          {gather(combos, sortedCodes, scope, charLimit - chars.length)}
        </span>
      </div>
    </div>
  );
}

function debounce(fn: () => void, ms: number) {
  let task = null as null | NodeJS.Timeout;
  return () => {
    if (task) clearTimeout(task);
    task = setTimeout(fn, ms);
  };
}

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(ref.current?.offsetWidth ?? 0);
    const resize = debounce(() => {
      setWidth(ref.current?.offsetWidth ?? 0);
    }, 100);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return { width, ref };
}

export default function Layout({
  scope,
  combos,
  sortedCodes,
  targetChar,
}: {
  scope: string;
  combos: Dict;
  sortedCodes: string[];
  targetChar: string | null;
}) {
  const { width, ref } = useWidth();
  const unit = (width - 2 * 9) / 10;
  const charLimit = Math.pow(Math.floor(unit / 16), 2);
  const targetCodes = targetChar ? getCodesForChar(targetChar) : [];
  return (
    <div ref={ref} className={style.root}>
      <div className={style.row}>
        {row1Keys.map((key) =>
          renderKey(
            combos,
            sortedCodes,
            scope + key,
            key,
            unit,
            charLimit,
            targetCodes
          )
        )}
      </div>
      <div className={style.row} style={{ marginLeft: "2%" }}>
        {row2Keys.map((key) =>
          renderKey(
            combos,
            sortedCodes,
            scope + key,
            key,
            unit,
            charLimit,
            targetCodes
          )
        )}
      </div>
      <div className={style.row} style={{ marginLeft: "8%" }}>
        {row3Keys.map((key) =>
          renderKey(
            combos,
            sortedCodes,
            scope + key,
            key,
            unit,
            charLimit,
            targetCodes
          )
        )}
      </div>
    </div>
  );
}
