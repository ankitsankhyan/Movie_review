import React from "react";

export default function Title({ children, className }) {
  return (
    <h1 className={"text-xl text-white font-semibold text-center " + className }>{children}</h1>
  );
}
