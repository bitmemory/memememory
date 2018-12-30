import React from "react";
import "./Title.css";

const Title = props => <h1 className="title">  <i class="fab fa-bitcoin"></i> {"  "}{props.children}</h1>;

export default Title;