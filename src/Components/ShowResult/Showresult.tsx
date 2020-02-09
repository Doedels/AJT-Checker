import React, { useState } from "react";
import { IncomeState } from "../../Containers/FrontPage/FrontPage";
import classes from "./ShowResult.module.css";

type ShowResultProps = {
  kind: boolean;
  partner: boolean;
  regeling: string;
  income: IncomeState;
};

const ShowResult = ({ kind, partner, regeling, income }: ShowResultProps) => {
  const [resultText, setResultText] = useState<JSX.Element[]>([]);

  const formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });

  function showResult(): JSX.Element[] {
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
                rel="noopener noreferrer"
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

  const check =
    regeling !== "" ? (
      <div>
        <button
          className={classes.Button}
          onClick={() => setResultText(showResult())}
        >
          Check
        </button>
      </div>
    ) : null;

  return (
    <div>
      {check}
      {resultText}
    </div>
  );
};

export default ShowResult;
