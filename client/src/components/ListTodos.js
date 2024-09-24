import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "./Preloader";
import { readTodos, deleteTodo } from "../functions";

function ListTodos() {
  const [todos, setTodos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    };
    fetchData();
  }, []);

  const removeTodo = async (id) => {
    await deleteTodo(id);
    const result = await readTodos();
    setTodos(result);
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="center">Todo List</h3>
        <div className="row right-align">
          <button
            className="wave-effect waves-light btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/add`);
            }}
          >
            Add New Todo
          </button>
        </div>
      </div>
      <div className="row">
        <div className="row">
          {!todos ? (
            <Preloader />
          ) : todos.length > 0 ? (
            <div className="collection">
              {todos.map((todo) => (
                <ul
                  key={todo._id}
                  className="collection-item"
                  style={{ position: "relative", padding: "16px" }}
                >
                  <div>
                    <h5>
                      <strong>{todo.title}</strong>
                    </h5>
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <button
                        onClick={() => navigate(`/edit/${todo._id}`)}
                        aria-label="Edit todo"
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <i className="material-icons">edit</i>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTodo(todo._id);
                        }}
                        aria-label="Delete todo"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <i className="material-icons red-text">delete</i>
                      </button>
                    </div>

                    <p>{todo.content}</p>
                    {todo.status === "completed" && (
                      <em className="green-text">Completed</em>
                    )}
                    {todo.status === "pending" && (
                      <em className="red-text">Pending</em>
                    )}
                  </div>
                </ul>
              ))}
            </div>
          ) : (
            <div>
              <h5>There is nothing to do.</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListTodos;
