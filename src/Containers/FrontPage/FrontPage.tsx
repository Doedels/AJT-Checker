import React from "react";

type FrontPageProps = {
  text: string;
};

const frontPage = (props: FrontPageProps) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

export default frontPage;
