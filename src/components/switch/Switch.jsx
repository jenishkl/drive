import React from "react";
import "./Switch.css";

const Switch = (props) => {
    return (
      <>
        <label class="pure-material-switch d-flex">
          <input
            onChange={props.onChange}
            value={props.value}
            defaultChecked={props.defaultChecked}
            onClick={props.onClick}
            checked={props.checked}
            type="checkbox"
            style={props.style}
          />
          <span style={props.style}>{props.label}</span>
        </label>
      </>
    );
};

export default Switch;