import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getProducts,
  addCategory,
  addBrand,
  addProduct,
  deleteCategory,
  deleteBrand,
  deleteProduct,
  selectProducts,
} from './productSlice';
import styles from './ProductCatalog.module.css';

export function ProductCatalog() {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  useEffect(() => {
    dispatch(getProducts());
}, [dispatch]);


  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => dispatch(addCategory())}
        >
         Add Category
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(addBrand())}
        >
          Add Brand
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(addProduct())}
        >
          Add Product
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
