import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";
import { AiFillCheckCircle} from "react-icons/ai"

const ToDo = ({ text, desc, id, setUpdateUI, setShowPopup, setPopupContent, done}) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id, desc });
    setShowPopup(true);
  };

  const checkTodo = () =>{
    axios.put(`${baseURL}/check/${id}`, { toDo: text , description: desc, done})
    .then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setShowPopup(false);
    });
  }
  return (
    <div className="toDo">
      <div>
        <p className="heading" >{text}</p>
        <p className="descrip">{desc}</p>
      </div>
      <div className="icons">
        <AiFillEdit size={30} className="icon" onClick={updateToDo} />
        <RxCross1 size={30} className="icon" onClick={deleteTodo} />
      </div>
        <button onClick={checkTodo}>{done ? "Uncompleted" : "Completed"}</button>
    </div>
  );
};

export default ToDo;
