import React from "react";
import CatCarrier from "../catcarrier";
import StartMenuButton from "../startmenubutton";
import StartMenu from "../startmenu";
import Kitty from "../kitty";
import Window from "../window";
import "./style.css";

const Playground = () => {
  // const [kittens, SetKittens] = useState<Array<

  return (
    <div className="playground">
      <StartMenuButton />
      <StartMenu />
      {/* <Window>
        <div>
          <p>Test contents </p>
        </div>
      </Window> */}
      <CatCarrier />
      <Kitty key={"23"} name="murray" color="white" />
      <Kitty key={"24"} name="steve" color="white" />
      <Kitty key={"23"} name="murray" color="white" />
      <Kitty key={"24"} name="steve" color="gold" />
      <Kitty key={"23"} name="murray" color="white" />
      <Kitty key={"24"} name="steve" color="white" />
      <Kitty key={"23"} name="murray" color="white" />
      <Kitty key={"24"} name="steve" color="white" />
    </div>
  );
};

export default Playground;
