import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readTodos, updateTodo } from "../functions";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    status: "pending",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    window.M.FormSelect.init(elems);
  }, [todo]);

  useEffect(() => {
    const fetchTodo = async () => {
      const todos = await readTodos();
      const currentTodo = todos.find((todo) => todo._id === id);
      if (currentTodo) {
        setTodo(currentTodo);
      }
    };
    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title || !todo.content) {
      setError("Title and Description cannot be empty.");
      return;
    }
    setError("");
    await updateTodo(id, todo);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="center">Edit Todo</h3>
        <form className="col s12" onSubmit={handleSubmit}>
          {error && (
            <div
              className="red-text center-align"
              style={{ marginBottom: "20px" }}
            >
              {error}
            </div>
          )}

          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input
                id="title"
                type="text"
                name="title"
                className="validate"
                value={todo.title}
                onChange={handleChange}
              />
              <label htmlFor="title" className={todo.title ? "active" : ""}>
                Title
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">description</i>
              <textarea
                id="content"
                name="content"
                className="materialize-textarea validate"
                value={todo.content}
                onChange={handleChange}
              />
              <label htmlFor="content" className={todo.content ? "active" : ""}>
                Description
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s2">
              <i className="material-icons prefix">priority_high</i>
              <select
                id="status"
                name="status"
                value={todo.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <label htmlFor="status" className="active">
                Status
              </label>
            </div>
          </div>

          <div className="row center-align">
            <button className="wave-effect waves-light btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;
