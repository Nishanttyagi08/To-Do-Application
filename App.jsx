import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {setToDos(res.data); console.log(res);})
      .catch((err) => console.log(err));
    }, [updateUI]);

    
  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input, description:desc })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
        setDesc("");
      })
      .catch((err) => console.log(err));
  };
   
  return (
    <main>
      <div className="container">
        <h1 className="title">ToDoGenius</h1>

        <div className="input_holder">
          <input className="todo-heading"
            name="todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo..."
          />

          <input className="todo-description"
            name="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder="Add Desc..."
          />
          <button onClick={saveToDo}>Submit</button>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              desc={el.description}
              done={el.done}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      <footer>
      <p>Made with Nishant Tyagi❤️</p>
    </footer>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
