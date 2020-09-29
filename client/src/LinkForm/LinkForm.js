import React, { useState } from "react";

export const LinkForm = (props) => {
  const { apollos, setApollos } = props;

  const [link, setLink] = useState("");

  const handleChange = (event) => {
    console.log(link);
    setLink(event.target.value);
  };

  const addLink = (event) => {
    event.preventDefault();
    if (link) {
      const linkObject = {
        id: Math.random() * 100,
        inputUrl: link,
        createDate: new Date(),
      };
      setApollos(apollos.concat(linkObject));
      setLink("");
    } else {
      console.log("No URL entered");
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
