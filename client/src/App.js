import React, { useState, useEffect } from "react";

import apolloService from "./services/apollo";

import { LinkForm } from "./components/LinkForm";
import { LinkList } from "./components/LinkList";

function App(props) {
  const [apollos, setApollos] = useState(props.apollos);

  useEffect(() => {
    console.log("effect");
    apolloService.getAll().then((initialApollos) => {
      console.log(initialApollos);
      setApollos(initialApollos);
    });
  }, []);

  return (
    <div>
      <LinkForm apollos={apollos} setApollos={setApollos} />
      <LinkList apollos={apollos} />
    </div>
  );
}

export default App;
