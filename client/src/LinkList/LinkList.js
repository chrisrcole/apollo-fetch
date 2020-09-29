import React, { useLayoutEffect } from "react";

export const LinkList = (props) => {
  const { apollos } = props;
  return (
    <ul>
      {apollos.map((link) => (
        <li key={link.id}>{link.inputUrl}</li>
      ))}
    </ul>
  );
};
