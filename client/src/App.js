import React, { useState, useEffect } from "react";

import apolloService from "./services/apollo";

import { LoginForm } from "./components/LoginForm";
import { LinkForm } from "./components/LinkForm";
import { LinkList } from "./components/LinkList";

function App() {
  const [apollos, setApollos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedApolloappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      apolloService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    apolloService.getAll().then((initialApollos) => {
      setApollos(initialApollos);
    });
  }, []);

  const showApollos =
    apollos.length > 0 ? <LinkList apollos={apollos} /> : <></>;

  return (
    <div>
      <LoginForm user={user} setUser={setUser} setApollos={setApollos} />
      {user !== null && (
        <>
          <p>{user.name} logged-in</p>
        </>
      )}
      <br></br>
      <LinkForm apollos={apollos} setApollos={setApollos} />
      {showApollos}
    </div>
  );
}

export default App;
