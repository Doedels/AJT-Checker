import React, { useState } from "react";
import IncomeQuery from "../../Components/IncomeQuery/IncomeQuery";
import classes from "./FrontPage.module.css";

const FrontPage = () => {
  const [partner, setPartner] = useState(false);
  const [regeling, setRegeling] = useState("");
  const [income, setIncome] = useState({});

  const partnerChangedHandler = (event: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setPartner(event.target.checked);
  };

  const inputChangeHandler = (event: {
    target: { name: any; value: React.ReactText };
  }) => {
    setIncome({
      ...income,
      [event.target.name]: +event.target.value
    });
  };

  const regelingChangedHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRegeling(event.target.value);
  };

  const inputs: JSX.Element[] = [];

  if (regeling === "AOW") {
    inputs.push(
      <IncomeQuery
        incomeArray={["AOW", "Pensioen"]}
        changed={inputChangeHandler}
      />
    );
    if (partner) {
      inputs.push(
        <IncomeQuery
          incomeArray={["AOW partner", "Pensioen partner"]}
          changed={inputChangeHandler}
        />
      );
    }
  } else if (regeling === "Jeugd") {
    inputs.push(
      <IncomeQuery
        incomeArray={["Ziektewet", "Andere uitkeringen", "Loon"]}
        changed={inputChangeHandler}
      />
    );
    if (partner) {
      inputs.push(
        <IncomeQuery
          incomeArray={[
            "Ziektewet partner",
            "Andere uitkeringen partner",
            "Loon partner"
          ]}
          changed={inputChangeHandler}
        />
      );
    }
  }

  return (
    <div>
      <div className={classes.header}>
        <h1>AOW- en Jeugdtegoed Checker</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.inputs}>
          <p>Welke regeling wilt u checken?</p>
          <input
            type="radio"
            name="regeling"
            value="AOW"
            onChange={regelingChangedHandler}
          />
          AOW tegoed
          <input
            type="radio"
            name="regeling"
            value="Jeugd"
            onChange={regelingChangedHandler}
          />
          Jeugd tegoed
          <br />
          <br />
          <input type="checkbox" onChange={partnerChangedHandler} />
          <label> Ik heb een partner</label>
          <br />
          <br />
          {inputs}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
