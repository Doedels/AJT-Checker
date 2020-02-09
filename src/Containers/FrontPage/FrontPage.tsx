import React, { useState } from "react";
import IncomeQuery from "../../Components/IncomeQuery/IncomeQuery";
import classes from "./FrontPage.module.css";
import ShowResult from "../../Components/ShowResult/Showresult";

export interface IncomeState {
  aow: number;
  pensioen: number;
  loon: number;
  ziektewet: number;
  andereUitkeringen: number;
  overig: number;
  aowPartner: number;
  pensioenPartner: number;
  loonPartner: number;
  ziektewetPartner: number;
  andereUitkeringenPartner: number;
  overigPartner: number;
}

const incomeDefaults = {
  aow: 0,
  pensioen: 0,
  loon: 0,
  ziektewet: 0,
  andereUitkeringen: 0,
  overig: 0,
  aowPartner: 0,
  pensioenPartner: 0,
  loonPartner: 0,
  ziektewetPartner: 0,
  andereUitkeringenPartner: 0,
  overigPartner: 0
};

const FrontPage = () => {
  const [partner, setPartner] = useState(false);
  const [kind, setKind] = useState(false);
  const [regeling, setRegeling] = useState("");
  const [income, setIncome] = useState<IncomeState>(incomeDefaults);

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
    target: { name: React.ReactText; value: React.ReactText };
  }) => {
    setIncome({
      ...income,
      [event.target.name]: +event.target.value
    });
  };

  const regelingChangedHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setIncome(incomeDefaults);
    setRegeling(event.target.value);
  };

  const inputs: JSX.Element[] = [];

  if (regeling === "AOW") {
    inputs.push(
      <div key="inkomenToolTip">
        <p>Vul hieronder uw netto maandinkomen in</p>
        <p>(4 weken inkomen * 13 /12 = maandinkomen)</p>
      </div>
    );
    inputs.push(
      <IncomeQuery
        key="AOW"
        incomeArray={[
          { label: "AOW", name: "aow" },
          {
            label: "Pensioen",
            name: "pensioen"
          },
          { label: "Loon, winst", name: "loon" }
        ]}
        changed={inputChangeHandler}
      />
    );
    if (partner) {
      inputs.push(
        <IncomeQuery
          key="AOW partner"
          incomeArray={[
            {
              label: "AOW partner",
              name: "aowPartner"
            },
            {
              label: "Pensioen partner",
              name: "pensioenPartner"
            },
            {
              label: "Loon, winst partner",
              name: "loonPartner"
            },
            {
              label: "Ziektenwet partner",
              name: "ziektenwetPartner"
            },
            {
              label: "Andere uitkeringen partner",
              name: "andereUitkeringenPartner"
            }
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
          {
            label: "Ziektewet",
            name: "ziektewet"
          },
          {
            label: "Andere uitkeringen",
            name: "andereUitkeringen"
          },
          {
            label: "Loon, winst",
            name: "loon"
          },
          {
            label: "Overig (Alimentatie, DUO)",
            name: "overig"
          }
        ]}
        changed={inputChangeHandler}
      />
    );
    if (partner) {
      inputs.push(
        <IncomeQuery
          key="Jeugd partner"
          incomeArray={[
            {
              label: "Ziektewet partner",
              name: "ziektewetPartner"
            },
            {
              label: "Andere uitkeringen partner",
              name: "andereUitkeringenPartner"
            },
            {
              label: "Loon, winst partner",
              name: "loonPartner"
            },
            {
              label: "Overig (Alimentatie, DUO) partner",
              name: "overigPartner"
            }
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
          {inputs}
          {regeling !== "" ? (
            <ShowResult
              kind={kind}
              partner={partner}
              regeling={regeling}
              income={income}
            />
          ) : null}
          <p>
            Deze app is geen product van de gemeente Rotterdam. Aan de
            berekening kunnen geen rechten worden ontleend
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
