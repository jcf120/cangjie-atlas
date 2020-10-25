import React, { useMemo, useState } from "react";
import style from "./App.module.css";
import { cangjieComposeDataToCode, defaultOpts, getData } from "./model";
import Layout from "./Layout";
import Settings from "./Settings";

function App() {
  const [opts, setOpts] = useState(defaultOpts);
  const [scope, setScope] = useState("");
  const [combos, sortedCodes] = useMemo(() => getData(opts), [opts]);
  return (
    <div className={style.root}>
      <Settings opts={opts} onChange={setOpts} />
      <Layout scope={scope} combos={combos} sortedCodes={sortedCodes} />
      <textarea
        onCompositionStart={(e) => setScope(cangjieComposeDataToCode(e.data))}
        onCompositionUpdate={(e) => setScope(cangjieComposeDataToCode(e.data))}
        onCompositionEnd={() => setScope("")}
      />
    </div>
  );
}

export default App;
