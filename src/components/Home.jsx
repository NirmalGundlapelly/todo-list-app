import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./Home.css";

export default function Home() {
  const [todo, addTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUuid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodoList([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((newTodo) => {
              setTodoList((oldTodo) => [...oldTodo, newTodo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Adding Todo Item (Create)
  const addTodoToDatabase = () => {
    if (todo !== "") {
      const uidd = uid();
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        todo: todo,
        uidd: uidd,
      });

      addTodo("");
    } else {
      alert("Please provide a valid input");
    }
  };

  // Updating Todo Item (Update)
  const onUpdate = (todo) => {
    setIsEdit(true);
    addTodo(todo.todo);
    setTempUuid(todo.uidd);
  };

  // After Editing and Confirming
  const onConfirmTodo = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });
    setIsEdit(false);
    addTodo("");
  };

  // Deleting the Todo Item (Delete)
  const onDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  const count = todoList.length;

  let totalTodoList = todoList.sort(function (a, b) {
    return a - b;
  });

  return (
    <>
      <div className="todo_header">
        <h1>Todo Lists</h1>
        <button className="signOutButton" onClick={onClickSignOut}>
          Sign Out
        </button>
      </div>
      <div className="todo_container">
        <div className="content_container">
          <div className="input_container">
            <input
              className="input_element todo_element"
              type="text"
              placeholder="Add Todo"
              value={todo}
              onChange={(e) => addTodo(e.target.value)}
            />
            {isEdit ? (
              <div>
                <button className="add_button" onClick={onConfirmTodo}>
                  Confirm
                </button>
              </div>
            ) : (
              <div>
                <button className="add_button" onClick={addTodoToDatabase}>
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Reading The Todo List */}
          {totalTodoList.map((todo) => (
            <div key={todo.uidd} className="todo_item_list">
              <h1 id="todo" className="todo_item">
                {todo.todo}
              </h1>
              <div>
                <button className="edit_button" onClick={() => onUpdate(todo)}>
                  Edit
                </button>
                <button
                  className="Delete_button"
                  onClick={() => onDelete(todo.uidd)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
