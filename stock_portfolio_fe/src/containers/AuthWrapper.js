import React from "react";

export default props => {
  let { success, fail, user } = props;
  if (user.user) {
    return <>{success}</>;
  } else {
    return <>{fail}</>;
  }
};
