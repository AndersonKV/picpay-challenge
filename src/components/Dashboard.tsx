import React, { useRef, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid white;
  padding: 20px;
  background: #536976; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #292e49,
    #536976
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #292e49,
    #536976
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  div {
    display: grid;
    grid-template-columns: 1fr;
    color: whitesmoke;
    font-weight: bold;
    span {
      text-align: left;
    }
  }

  button {
    width: 50%;
    height: 40px;
    margin-top: 20px;
    margin-left: 40px;
    background: black;
    color: white;
    padding: 10px;
    cursor: pointer;
  }
`;

interface User {
  id: string;
  name: string;
  img: string;
  username: string;
}

interface SelectProps {
  props: User;
}

const Dashboard: React.FC<SelectProps> = () => {
  const [users, setUsers] = useState<any[]>();
  const [switchClass, setSwitchClass] = useState("");

  useEffect(() => {
    async function load() {
      const emptyUser: any = [];

      var controller = new AbortController();
      var signal = controller.signal;

      fetch("https://www.mocky.io/v2/5d531c4f2e0000620081ddce", {
        signal: signal,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (user: Array<string>) {
          for (let i = 0; i < 5; i++) {
            emptyUser.push(user[i]);
          }
          setUsers(emptyUser);
        });
    }

    load();
  }, []);

  const handleOpenModal = useCallback((event) => {
    setSwitchClass("switch");
  }, []);

  return (
    <>
      <div className={`perfil-users ${switchClass ? switchClass : ""}`}>
        {users != null
          ? users.map((user: User, len: any) => (
              <Link
                key={len}
                to={{
                  pathname: "/payment",
                  state: { user },
                }}
              >
                <Grid id={user.id}>
                  <img src={user.img} />
                  <div>
                    <span>Nome do usuario: {user.name}</span>
                    <span>Username: {user.username}</span>
                    <span>ID: {user.id}</span>
                  </div>
                  <button onClick={handleOpenModal} id={user.id}>
                    Pagar
                  </button>
                </Grid>
              </Link>
            ))
          : ""}
      </div>
    </>
  );
};

export default Dashboard;
