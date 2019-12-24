import React, { useState } from "react";
import IncomeQuery from "../../Components/IncomeQuery/IncomeQuery";

const FrontPage = () => {
  const [partner, setPartner] = useState(false);

  const partnerChangedHandler = (event: any) => {
    setPartner(event.target.checked);
  };

  return (
    <div>
      <div className={"header"}>
        <h1>AOW- en Jeugdtegoed Checker</h1>
      </div>

      <input type="checkbox" onChange={partnerChangedHandler} />
      <p>Partner = {`${partner}`}</p>
      <IncomeQuery incomeArray={["Ziektewet", "Andere uitkeringen", "Loon"]} />
    </div>
  );
};

export default FrontPage;
