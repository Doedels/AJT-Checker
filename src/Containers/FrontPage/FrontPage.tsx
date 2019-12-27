import React, { useState } from "react";
import IncomeQuery from "../../Components/IncomeQuery/IncomeQuery";
import classes from "./FrontPage.module.css";

const FrontPage = () => {
  const [partner, setPartner] = useState(false);
  const [kind, setKind] = useState(false);
  const [regeling, setRegeling] = useState("");
  const [income, setIncome] = useState({});

  const partnerChangedHandler = (event: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setPartner(event.target.checked);
  };

  const kindChangedHandler = (event: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setKind(event.target.checked);
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
      <div>
        <p>Vul hieronder uw netto maandinkomen in</p>
        <p>(4 weken inkomen * 13 /12 = maandinkomen)</p>
      </div>
    );
    inputs.push(
      <IncomeQuery
        key="AOW"
        incomeArray={["AOW", "Pensioen", "Overig (Loon, winst)"]}
        changed={inputChangeHandler}
      />
    );
    if (partner) {
      inputs.push(
        <IncomeQuery
          key="AOW partner"
          incomeArray={[
            "AOW partner",
            "Pensioen partner",
            "Overig partner (Loon, winst)"
          ]}
          changed={inputChangeHandler}
        />
      );
    }
  } else if (regeling === "Jeugd") {
    inputs.push(
      <div key="kind">
        <br />
        <input type="checkbox" onChange={kindChangedHandler} />
        <label>
          Ik heb een kind dat op 1 januari 2020 11 jaar of jonger is.
        </label>
        <p>Vul hieronder uw netto maandinkomen in</p>
        <p>(4 weken inkomen * 13 /12 = maandinkomen)</p>
      </div>
    );
    inputs.push(
      <IncomeQuery
        key="Jeugd"
        incomeArray={[
          "Ziektewet",
          "Andere uitkeringen",
          "Loon",
          "Overig (Alimentatie, DUO, winst)"
        ]}
        changed={inputChangeHandler}
      />
    );
    if (partner) {
      inputs.push(
        <IncomeQuery
          key="Jeugd partner"
          incomeArray={[
            "Ziektewet partner",
            "Andere uitkeringen partner",
            "Loon partner",
            "Overig (Alimentatie, DUO, winst)"
          ]}
          changed={inputChangeHandler}
        />
      );
    }
  }

  const check = [];

  if (regeling != "") {
    check.push(
      <div>
        <button className={classes.Button}>Check</button>
      </div>
    );
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
          {inputs}
          {check}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
