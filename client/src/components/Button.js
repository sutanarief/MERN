import React from "react";

const Button = props => {
  return (
    <>
      <button
        type={props.type}
        className={props.bootstrap}
        onClick={props.action}
        data-bs-toogle={props.toogle}
        data-bs-target={props.target}
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
