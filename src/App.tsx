import React, { useState } from "react";
import style from "./App.module.css";
import Layout from "./Layout";

function charToKey(char: string) {
  switch (char) {
    case "手":
      return "q";
    case "田":
      return "w";
    case "水":
      return "e";
    case "口":
      return "r";
    case "廿":
      return "t";
    case "卜":
      return "y";
    case "山":
      return "u";
    case "戈":
      return "i";
    case "人":
      return "o";
    case "心":
      return "p";
    case "日":
      return "a";
    case "尸":
      return "s";
    case "木":
      return "d";
    case "火":
      return "f";
    case "土":
      return "g";
    case "竹":
      return "h";
    case "十":
      return "j";
    case "大":
      return "k";
    case "中":
      return "l";
    case "　":
      return "z";
    case "已":
      return "x";
    case "金":
      return "c";
    case "女":
      return "v";
    case "月":
      return "b";
    case "弓":
      return "n";
    case "一":
      return "m";
    default:
      return char.toLowerCase();
  }
}

function normaliseScope(scope: string) {
  return scope.split("").map(charToKey).join("");
}

function App() {
  const [scope, setScope] = useState("");
  return (
    <div className={style.root}>
      <div className={style.breadcrumb}>
        <input
          autoFocus
          placeholder="Begin typing"
          onChange={(e) => setScope(e.target.value)}
        />
      </div>
      <div className={style.layoutContainer}>
        <Layout scope={normaliseScope(scope)} />
      </div>
    </div>
  );
}

export default App;
