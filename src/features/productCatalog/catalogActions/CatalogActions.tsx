import React, { useState } from "react";

import "./CatalogActions.css";
import { InputForm, InputMode } from "./inputForm/InputForm";

export function CatalogActions() {
  const [inputMode, changeInputMode] = useState<InputMode | undefined>(
    undefined
  );

  return (
    <div className="actions">
      <div>
        <button
          className="button"
          onClick={() => changeInputMode(InputMode.category)}
        >
          Add Category
        </button>
        <button
          className="button"
          onClick={() => changeInputMode(InputMode.brand)}
        >
          Add Brand
        </button>
        <button
          className="button"
          onClick={() => changeInputMode(InputMode.product)}
        >
          Add Product
        </button>
      </div>
      <div>
        <InputForm inputMode={inputMode}></InputForm>
      </div>
    </div>
  );
}
