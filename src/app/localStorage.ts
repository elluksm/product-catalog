export const loadProductCatalog = () => {
  try {
    const serializedState = localStorage.getItem("productCatalog");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState).categories;
  } catch (err) {
    return undefined;
  }
};

// localStorage.js
export const saveProductCatalog = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("productCatalog", serializedState);
  } catch {
    // ignore write errors
  }
};
