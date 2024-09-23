import { Routes, Route } from "react-router-dom";
import EditTodo from "./components/EditTodo";
import ListTodos from "./components/ListTodos";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListTodos />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/edit/:id" element={<EditTodo />} />
    </Routes>
  );
}

export default App;
