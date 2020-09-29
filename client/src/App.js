import React, { useState } from "react";

import { LinkForm } from "./components/LinkForm";
import { LinkList } from "./components/LinkList";

function App(props) {
  const [apollos, setApollos] = useState(props.apollos);

  return (
    <div>
      <LinkForm apollos={apollos} setApollos={setApollos} />
      <LinkList apollos={apollos} />
    </div>
  );
}

export default App;
