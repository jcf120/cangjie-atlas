import React, { useMemo, useState } from "react";
import style from "./App.module.css";
import { cangjieComposeDataToCode, defaultOpts, getData } from "./model";
import Layout from "./Layout";
import Settings from "./Settings";
import { TargetText } from "./TargetText";

function findTargetChar(targetText: string, currentText: string) {
  for (let i = 0; i < targetText.length; i++) {
    if (targetText[i] !== currentText[i])
      return { value: targetText[i], idx: i };
  }
  return null;
}

function App() {
  const [opts, setOpts] = useState(defaultOpts);
  const [scope, setScope] = useState("");
  const [combos, sortedCodes] = useMemo(() => getData(opts), [opts]);
  const [targetText, setTargetText] = useState("手田我");
  const [currentText, setCurrentText] = useState("");
  const targetChar = findTargetChar(targetText, currentText);
  return (
    <div className={style.root}>
      <Settings opts={opts} onChange={setOpts} />
      <Layout scope={scope} combos={combos} sortedCodes={sortedCodes} />
      <TargetText
        text={targetText}
        onChange={setTargetText}
        completeUntil={targetChar?.idx ?? targetText.length}
      />
      <textarea
        autoFocus
        onCompositionStart={(e) => setScope(cangjieComposeDataToCode(e.data))}
        onCompositionUpdate={(e) => setScope(cangjieComposeDataToCode(e.data))}
        onCompositionEnd={() => setScope("")}
        onChange={(e) => setCurrentText(e.target.value)}
        value={currentText}
      />
    </div>
  );
}

export default App;
