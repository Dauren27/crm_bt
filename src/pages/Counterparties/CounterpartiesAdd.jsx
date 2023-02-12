import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import cl from "../../components/style.module.scss";
import { ClientAddContent, EntityAddContent } from "../../components";

const CounterpartiesAdd = () => {
  const [value, setValue] = useState(1);
  function changeValue(e) {
    setValue(e.target.value);
  }
  return (
    <Layout>
      <div className={cl.counterparties__content}>
        <div className={cl.counterparties__checkboxes}>
          <label>
            <span>Физические лица</span>
            <input
              type="radio"
              name="radio"
              value="1"
              checked={value == "1" ? true : false}
              onChange={changeValue}
            />
          </label>
          <label>
            <span>Юридические лица</span>
            <input
              type="radio"
              name="radio"
              value="2"
              checked={value === "2" ? true : false}
              onChange={changeValue}
            />
          </label>
        </div>
        {value == 1 ? <ClientAddContent /> : <EntityAddContent />}
      </div>
    </Layout>
  );
};

export default CounterpartiesAdd;
