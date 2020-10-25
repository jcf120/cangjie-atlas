import React from "react";
import { Opts } from "./model";

export default function Settings({
  opts,
  onChange,
}: {
  opts: Opts;
  onChange: (opts: Opts) => void;
}) {
  const toggler = (field: keyof Opts) => () =>
    onChange({ ...opts, [field]: !opts[field] });
  return (
    <div>
      <label>
        <input type="checkbox" checked={opts.hsk1} onChange={toggler("hsk1")} />
        HSK1
      </label>
      <label>
        <input type="checkbox" checked={opts.hsk2} onChange={toggler("hsk2")} />
        HSK2
      </label>
      <label>
        <input type="checkbox" checked={opts.hsk3} onChange={toggler("hsk3")} />
        HSK3
      </label>
      <label>
        <input type="checkbox" checked={opts.hsk4} onChange={toggler("hsk4")} />
        HSK4
      </label>
      <label>
        <input type="checkbox" checked={opts.rest} onChange={toggler("rest")} />
        Other
      </label>
    </div>
  );
}
