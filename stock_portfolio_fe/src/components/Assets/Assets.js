import React from "react";
import Asset from "../Asset/Asset";

const Assets = props => {
  return (
    <div>
      {props.assets.map((asset, i) => {
        return <Asset key={i} asset={asset} />;
      })}
    </div>
  );
};

export default Assets;
