import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../functions";

function AddTodo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    status: "pending",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    window.M.FormSelect.init(elems, {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title || !todo.content) {
      setError("Title and Description cannot be empty.");
      return;
    }
    setError("");
    await createTodo(todo);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="center">Add Todo</h3>
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
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="title">Title</label>
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
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="content">Description</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s2">
              <i className="material-icons prefix">priority_high</i>
              <select
                id="status"
                name="status"
                value={todo.status}
                onChange={(e) => setTodo({ ...todo, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <label htmlFor="status">Status</label>
            </div>
          </div>

          <div className="row center-align">
            <button className="wave-effect waves-light btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
