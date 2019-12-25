import React, { useState } from "react";
import IncomeQuery from "../../Components/IncomeQuery/IncomeQuery";
import classes from "./FrontPage.module.css";

const FrontPage = () => {
  const [partner, setPartner] = useState(false);
  const [income, setIncome] = useState({});

  const partnerChangedHandler = (event: any) => {
    setPartner(event.target.checked);
  };

  const inputChangeHandler = (event: any) => {
    setIncome({
      ...income,
      [event.target.name]: +event.target.value
    });
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>AOW- en Jeugdtegoed Checker</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.inputs}>
          <input type="checkbox" onChange={partnerChangedHandler} />
          <p>Partner = {`${partner}`}</p>
          <IncomeQuery
            incomeArray={["Ziektewet", "Andere uitkeringen", "Loon"]}
            changed={inputChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
