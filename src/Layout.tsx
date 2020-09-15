import React from "react";
import layoutsJson from "./data/layouts.json";
import style from "./Layout.module.css";

type LayoutData = Record<string, string | undefined>;
type LayoutsData = Record<string, LayoutData | undefined>;
const layoutsData: LayoutsData = layoutsJson;

const row1Keys = Array.from("qwertyuiop");
const row2Keys = Array.from("asdfghjkl");
const row3Keys = Array.from("zxcvbnm");

export default function Layout({
  hideChars = false,
  width,
  chars,
  scope,
}: {
  hideChars?: boolean;
  width: number;
  chars?: string;
  scope: string;
}) {
  if (width < 5) {
    return (
      <div
        className={style.root}
        style={{
          width,
          height: width,
          backgroundColor: chars?.length ? "grey" : "none",
          borderRadius: "50%",
        }}
      />
    );
  }
  const layout = layoutsData[scope];
  const childWidth = width / 10;
  const charHeight = chars?.length ? width / (2 * chars.length) : 0;
  return (
    <div className={style.root} style={{ width }}>
      {!hideChars && (
        <div className={style.charsRow} style={{ fontSize: charHeight }}>
          {chars}
        </div>
      )}
      <div className={style.layoutRow}>
        {row1Keys.map((key, idx) => (
          <Layout
            key={idx}
            width={childWidth}
            scope={scope + key}
            chars={layout?.[key]}
          />
        ))}
      </div>
      <div className={style.layoutRow}>
        {row2Keys.map((key, idx) => (
          <Layout
            key={idx}
            width={childWidth}
            scope={scope + key}
            chars={layout?.[key]}
          />
        ))}
      </div>
      <div className={style.layoutRow}>
        {row3Keys.map((key, idx) => (
          <Layout
            key={idx}
            width={childWidth}
            scope={scope + key}
            chars={layout?.[key]}
          />
        ))}
      </div>
    </div>
  );
}
