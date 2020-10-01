import React, { useState } from "react";

import { apolloService, login, signup } from "../../services";

export const LoginForm = (props) => {
  const { user, setUser, setApollos } = props;
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("Chris");

  const handleSignup = async (event) => {
    event.preventDefault();

    const user = await signup({
      name,
      email,
      password,
    });

    try {
      window.localStorage.setItem("loggedApolloappUser", JSON.stringify(user));
      apolloService.setToken(user.token);
      setUser(user);
      setEmail("");
      setPassword("");
      apolloService.getAll().then((initialApollos) => {
        setApollos(initialApollos);
      });
    } catch (error) {
      console.log(error.errors);
    }
  };

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
      apolloService.getAll().then((initialApollos) => {
        setApollos(initialApollos);
      });
    } catch (exception) {
      console.log("Wrong credentials", exception);
    }
  };
  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    apolloService.setToken(null);
    apolloService.getAll().then((initialApollos) => {
      setApollos(initialApollos);
    });
    window.localStorage.removeItem("loggedApolloappUser");
  };
  return (
    <>
      {user !== null ? (
        <form onSubmit={handleLogout}>
          <button type="submit">Logout</button>
        </form>
      ) : (
        <>
          <form onSubmit={handleSignup}>
            <div>
              name
              <input
                type="text"
                value={name}
                name="name"
                onChange={({ target }) => setName(target.value)}
              />
            </div>
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
            <button type="submit">sign up</button>
          </form>
          <br></br>
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
        </>
      )}
    </>
  );
};
