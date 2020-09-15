import React, { useEffect, useRef, useState } from "react";
import style from "./App.module.css";
import Layout from "./Layout";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [scope, setScope] = useState("");
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
    document.addEventListener("keydown", (e) => {
      setScope((scope) =>
        e.code === "Backspace"
          ? scope.substring(0, scope.length - 1)
          : scope + e.key
      );
    });
  }, [ref]);
  return (
    <div className={style.root} ref={ref}>
      {width && <Layout hideChars width={width} scope={scope} />}
    </div>
  );
}

export default App;
