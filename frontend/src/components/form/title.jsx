import React from "react";

export default function Title({ children, className }) {
  return (
    <h1 className={"text-xl dark:text-white text-black font-semibold text-center " + className }>{children}</h1>
  );
}
