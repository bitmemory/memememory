import React from "react";
import "./Title.css";

const Title = props => <h1 className="title">  <i className="fab fa-bitcoin"></i> {"  "}{props.children}</h1>;

export default Title;