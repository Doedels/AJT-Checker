import React, { useState } from "react";
import IncomeQuery from "../../Components/IncomeQuery/IncomeQuery";
import classes from "./FrontPage.module.css";

const FrontPage = () => {
  const [partner, setPartner] = useState(false);

  const partnerChangedHandler = (event: any) => {
    setPartner(event.target.checked);
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
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
