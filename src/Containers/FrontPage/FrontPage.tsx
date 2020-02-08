import React, { useState } from "react";
import IncomeQuery from "../../Components/IncomeQuery/IncomeQuery";
import classes from "./FrontPage.module.css";

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
  const [resultText, setResultText] = useState<JSX.Element[]>([]);

  const formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });

  function showResult(regeling: string, income: IncomeState): JSX.Element[] {
    let totalIncome = 0;
    let niet = "";
    const elementsArray = [];
    if (regeling === "AOW") {
      if (income.aow > 0) {
        totalIncome += income.aow;
        elementsArray.push(<p key="1">{formatter.format(income.aow)} AOW</p>);
      }
      if (income.pensioen > 0) {
        totalIncome += income.pensioen;
        elementsArray.push(
          <p key="2">{formatter.format(income.pensioen)} Pensioen</p>
        );
      }
      if (income.overig) {
        totalIncome += income.overig;
        elementsArray.push(
          <p key="3">{formatter.format(income.overig)} Overig</p>
        );
      }
      if (partner) {
        if (income.aowPartner) {
          totalIncome += income.aowPartner;
          elementsArray.push(
            <p key="4">{formatter.format(income.aowPartner)} AOW partner</p>
          );
        }
        if (income.pensioenPartner) {
          totalIncome += income.pensioenPartner;
          elementsArray.push(
            <p key="5">
              {formatter.format(income.pensioenPartner)} Pensioen partner
            </p>
          );
        }
        if (income.overigPartner) {
          totalIncome += income.overigPartner;
          elementsArray.push(
            <p key="6">
              {formatter.format(income.overigPartner)} Overig partner
            </p>
          );
        }
        if (income.ziektewetPartner) {
          totalIncome += income.ziektewetPartner;
          elementsArray.push(
            <p key="7">
              {formatter.format(income.ziektewetPartner)} Ziektewet partner
            </p>
          );
        }
        if (income.andereUitkeringenPartner) {
          totalIncome += income.andereUitkeringenPartner;
          elementsArray.push(
            <p key="8">
              {formatter.format(income.andereUitkeringenPartner)} Andere
              uitkeringen partner
            </p>
          );
        }
        if (
          income.aowPartner +
            income.loonPartner +
            income.overigPartner +
            income.pensioenPartner +
            income.ziektewetPartner +
            income.andereUitkeringen <
          50
        ) {
          totalIncome += 45;
          elementsArray.push(
            <p key="9">
              {formatter.format(45)} Algemene heffingskorting van de partner
              zonder inkomen. Is uw partner geboren vóór 1963 dan is dit bedrag
              mogelijk hoger. Bezoek de website van de
              <a
                href="https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/algemene_heffingskorting"
                target="_blank"
              >
                Belastingdiest
              </a>
              voor meer informatie
            </p>
          );
        }
        totalIncome > 1667 ? (niet = "niet ") : (niet = "");
        elementsArray.push(
          <p key="10">
            {formatter.format(totalIncome)} TOTAAL
            <br />
            <br />U komt {niet}in aanmerking voor het AOW-tegoed.
            <br />
            Het voor u geldende grensbedrag is {formatter.format(1667)}.
          </p>
        );
        return elementsArray;
      } else {
        // dus geen partner
        totalIncome > 1230 ? (niet = "niet ") : (niet = "");
        elementsArray.push(
          <p key="11">
            {formatter.format(totalIncome)} TOTAAL
            <br />
            <br />U komt {niet}in aanmerking voor het AOW-tegoed.
            <br />
            Het voor u geldende grensbedrag is {formatter.format(1230)}.
          </p>
        );
        return elementsArray;
      }
    } else {
      // regeling === "Jeugd"
      return [<p>hoe kwam ik hier?</p>];
    }
  }

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

  const check =
    regeling !== "" ? (
      <div>
        <button
          className={classes.Button}
          onClick={() => setResultText(showResult(regeling, income))}
        >
          Check
        </button>
      </div>
    ) : null;

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
          {resultText}
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
