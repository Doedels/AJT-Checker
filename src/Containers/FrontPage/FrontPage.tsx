import React, { useState } from "react";

type FrontPageProps = {
  text: string;
  number?: number;
};

const FrontPage = (props: FrontPageProps) => {
  const [partner, setPartner] = useState(false);

  const partnerChangedHandler = (event: any) => {
    setPartner(event.target.checked);
  };

  return (
    <div>
      <h1>{props.text}</h1>
      <input type="checkbox" onChange={partnerChangedHandler} />
      <p>Partner = {`${partner}`}</p>
    </div>
  );
};

export default FrontPage;
