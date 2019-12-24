import React from "react";

type IncomeQueryProps = {
  incomeArray: string[];
};

const IncomeQuery = (props: IncomeQueryProps) => {
  const inputs = props.incomeArray.map(income => {
    return (
      <div key={income}>
        <input type="number" min="0" name={income} />
        <label>{income}</label>
      </div>
    );
  });

  return (
    <div>
      <form>{inputs}</form>
    </div>
  );
};

export default IncomeQuery;
