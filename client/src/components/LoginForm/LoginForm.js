import React, { useState } from "react";

import { apolloService, login } from "../../services";

export const LoginForm = (props) => {
  const { user, setUser } = props;
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({
        email,
        password,
      });

      window.localStorage.setItem("loggedApolloappUser", JSON.stringify(user));
      apolloService.setToken(user.token);
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials", exception);
    }
  };
  return (
    <>
      {user === null && (
        <form onSubmit={handleLogin}>
          <div>
            email
            <input
              type="text"
              value={email}
              name="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      )}
    </>
  );
};
