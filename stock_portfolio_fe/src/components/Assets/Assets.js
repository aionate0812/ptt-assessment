import React from "react";
import Asset from "../Asset/Asset";

const Assets = props => {
  return (
    <React.Fragment>
      {props.assets.map((asset, i) => {
        return <Asset key={i} asset={asset} />;
      })}
    </React.Fragment>
  );
};

export default Assets;
