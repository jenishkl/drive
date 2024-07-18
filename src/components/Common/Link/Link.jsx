import React from "react";
import { Link as Links } from "react-router-dom";

export default function Link({ to, children, style, target = "_self" }) {
  return (
    <Links to={to} style={{ textDecoration: "none", ...style }} target={target}>
      {children}
    </Links>
  );
}
