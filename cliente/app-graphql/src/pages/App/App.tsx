import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [reqValue, setReqValue] = useState("");

  useEffect(() => {
    // loadData()
  }, []);

  const loadData = async () => {
    const req = {
      query: `
        query{
          user(id:1){
            name,
            id
          }
        }
      `,
    };

    const {
      data: {
        data: { user },
      },
    } = await axios.post("http://localhost:4000", req, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(user);
    setReqValue(user);
  };

  return (
    <div className="App">
      <h1>Teste</h1>
      <textarea
        name="return"
        id="return"
        value={reqValue}
        onChange={(e) => setReqValue(e.target.value)}
        cols={30}
        rows={10}
      />
      <div>
        <button onClick={loadData}>Buscar</button>
      </div>
    </div>
  );
}

export default App;
