import React from "react";

type IncomeQueryProps = {
  incomeArray: { label: string; name: string }[];
  changed: (event: any) => void;
};

const IncomeQuery = (props: IncomeQueryProps) => {
  const inputs = props.incomeArray.map(income => {
    return (
      <div key={income.label}>
        <input
          type="number"
          min="0"
          id={income.label}
          name={income.name}
          onChange={props.changed}
        />
        <label htmlFor={income.label}> {income.label}</label>
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
