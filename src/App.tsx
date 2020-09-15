import React, { useEffect, useRef, useState } from "react";
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
  });
  return scope;
}

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ref]);
  const scope = useScopeInput();
  return (
    <div className={style.root} ref={ref}>
      {!!width && <Layout hideChars width={width} scope={scope} />}
    </div>
  );
}

export default App;
