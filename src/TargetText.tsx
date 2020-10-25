import React, { useState } from "react";
import style from "./TextTarget.module.css";

export function TargetText({
  text,
  onChange,
  completeUntil,
}: {
  text: string;
  onChange: (text: string) => void;
  completeUntil: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <div className={style.root}>
        <textarea value={text} onChange={(e) => onChange(e.target.value)} />
        <button type="button" onClick={() => setIsEditing(false)}>
          Done
        </button>
      </div>
    );
  } else {
    const complete = text.substring(0, completeUntil);
    const incomplete = text.substring(completeUntil, text.length);
    return (
      <div className={style.root}>
        <div>
          <span>{complete}</span>
          <span className={style.incomplete}>{incomplete}</span>
        </div>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
    );
  }
}
