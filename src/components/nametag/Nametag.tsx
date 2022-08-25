import React from "react";
import "./style.css";

interface Props {
  name: string;
}

const Nametag = ({ name }: Props) => {
  return <div className="nametag">{name}</div>;
};

export default Nametag;
