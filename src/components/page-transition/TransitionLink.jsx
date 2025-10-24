import React from "react";
import { NavLink } from "react-router-dom";

// Simple passthrough: TransitionLink now behaves like a plain NavLink (no transition)
export default function TransitionLink(props) {
  return <NavLink {...props}>{props.children}</NavLink>;
}
