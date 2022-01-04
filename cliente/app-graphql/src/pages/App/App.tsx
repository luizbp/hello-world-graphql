import "./App.scss";
import { useState } from "react";
import axios from "axios";

function App() {
  const [reqValue, setReqValue] = useState<any>();
  const [inputName, setInputName] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAction, setInputAction] = useState("insert");


  const loadData = async () => {
    const req = {
      query: `
        query{
          users{
            name,
            email,
            id
          }
        }
      `,
    };

    const {
      data: {
        data: { users },
      },
    } = await axios.post("http://localhost:4000", req, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    setReqValue(users);
  };

  const updateAndInsertData = async () => {
    const action =
      inputAction === "insert"
        ? `createUser(name:"${inputName}", email:"${inputEmail}")`
        : `updateUser(id:"${inputId}", name:"${inputName}", email:"${inputEmail}")`;

    const req = {
      query: `
        mutation{
          ${action}{
            id,
            name,
            email
          }
        }
      `,
    };

    await axios.post("http://localhost:4000", req, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await loadData();
  };

  return (
    <div className="App">
      <h1>Estudo de GraphQl</h1>
      <div className="box">
        <h4>Buscando dados</h4>
        <div className="box-json-view">
          {/* <ReactJson src={reqValue} theme="colors"/> */}
          <code>
            <pre id="dataJson" className="data-json">
              {`${reqValue ? JSON.stringify(reqValue, null, 4) : 'Lista vazia'}`}
            </pre>
          </code>
        </div>
        <div>
          <button onClick={loadData}>Buscar</button>
        </div>
      </div>
      <div className="box">
        <h4>Adicionando e alterando dados</h4>
        <div className="box-form">
          <div className="box-input">
            <label htmlFor="selectActions">Ação</label>
            <select
              name="selectActions"
              onChange={(e) => setInputAction(e.target.value)}
              id="selectActions"
            >
              <option value="insert">Adicionar</option>
              <option value="update">Atualizar</option>
            </select>
          </div>
          <div className="box-input">
            <label htmlFor="inputId">ID</label>
            <input
              name="inputId"
              type="number"
              disabled={inputAction === "insert"}
              value={inputId}
              onChange={(e: any) => setInputId(e.target.value)}
            />
          </div>
          <div className="box-input">
            <label htmlFor="inputName">Nome</label>
            <input
              name="inputName"
              type="text"
              value={inputName}
              onChange={(e: any) => setInputName(e.target.value)}
            />
          </div>
          <div className="box-input">
            <label htmlFor="inputName">Email</label>
            <input
              name="email"
              type="text"
              value={inputEmail}
              onChange={(e: any) => setInputEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button onClick={updateAndInsertData}>
            {inputAction === "insert" ? "Adicionar" : "Atualizar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
