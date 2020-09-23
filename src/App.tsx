import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import Layout from "./Layout";

const acceptedKeys = "qwertyuiopasdfghjklzxcvbnm";

function useScopeInput() {
  const [scope, setScope] = useState("");
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (acceptedKeys.includes(e.key)) {
        setScope((scope) => scope + e.key);
      } else if (e.code === "Backspace") {
        setScope((scope) => scope.substring(0, scope.length - 1));
      }
    });
  }, []);
  return scope;
}

function App() {
  const scope = useScopeInput();
  return (
    <div className={style.root}>
      <div className={style.breadcrumb}>Scope: {scope || "<Begin typing>"}</div>
      <div className={style.layoutContainer}>
        <Layout scope={scope} />
      </div>
    </div>
  );
}

export default App;
