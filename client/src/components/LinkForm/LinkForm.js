import React, { useState } from "react";

import { validURL } from "../../services";

export const LinkForm = (props) => {
  const { apollos, setApollos } = props;

  const [link, setLink] = useState("https://www.google.com");

  const handleChange = (event) => {
    console.log(link);
    setLink(event.target.value);
  };

  const addLink = (event) => {
    event.preventDefault();
    if (link && validURL(link)) {
      const linkObject = {
        id: Math.random() * 100,
        inputUrl: link,
        createDate: new Date(),
      };
      setApollos(apollos.concat(linkObject));
      setLink("https://www.google.com");
    } else {
      console.log({ error: "Please input a proper URL", input: link });
    }
  };
  return (
    <form onSubmit={addLink}>
      <label>
        URL:<input type="text" value={link} onChange={handleChange}></input>
      </label>
      <button type="submit">Shorten</button>
    </form>
  );
};
