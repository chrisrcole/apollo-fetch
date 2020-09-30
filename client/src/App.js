import React, { useState, useEffect } from "react";

import apolloService from "./services/apollo";

import { LinkForm } from "./components/LinkForm";
import { LinkList } from "./components/LinkList";

function App() {
  const [apollos, setApollos] = useState([]);

  useEffect(() => {
    apolloService.getAll().then((initialApollos) => {
      setApollos(initialApollos);
    });
  }, []);

  const showApollos =
    apollos.length > 0 ? <LinkList apollos={apollos} /> : <></>;

  return (
    <div>
      <LinkForm apollos={apollos} setApollos={setApollos} />
      {showApollos}
    </div>
  );
}

export default App;
