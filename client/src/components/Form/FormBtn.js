import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "left", marginBottom: 10 }} className="btn bg-primary text-white">
    {props.children}
  </button>
);
