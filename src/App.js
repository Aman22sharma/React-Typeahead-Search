import { useEffect, useMemo, useState } from 'react';
import './App.css';
import TodoCard from './Components/TodoCard';
import AddTodo from './Components/AddTodo';
import TypeaheadSearch from './Components/TypeaheadSearch';


function App() {
  let todoList = [
    { name: 'Learn Js', id: '1', description: 'This time need to utilise to learn javascript' },
    { name: 'Learn Js', id: '2', description: 'This time need to utilise to learn javascript' },
  ]

  const [todos, setTodoList] = useState(todoList);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const addTodo = (newTodo) => {
    setTodoList((prevTodos) => [
      ...prevTodos,
      {
        name: newTodo.name,
        id: crypto.randomUUID(),
        description: newTodo.description
      }
    ]);
  };

  const DeleteItem = (id) => {
    setTodoList((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === id);

      if (index === -1) return prevTodos;

      return [
        ...prevTodos.slice(0, index),
        ...prevTodos.slice(index + 1)
      ];
    });
  };

  // Debounce: wait 300ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText.trim().toLowerCase());
    }, 300);

    // Cancel the previous timer when the input changes
    return () => clearTimeout(timer);
  }, [searchText]);

  // Filter todos using the debounced value
  const filteredTodos = useMemo(() => {
    if (debouncedSearchText.length < 3) {
      return todos;
    }

    return todos.filter((todo) => {
      const name = todo.name.toLowerCase();
      const description = todo.description.toLowerCase();

      return (
        name.includes(debouncedSearchText) ||
        description.includes(debouncedSearchText)
      );
    });
  }, [todos, debouncedSearchText]);


  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Todo App</a>
          <TypeaheadSearch onSearch={setSearchText} />
          <button onClick={() => setShowModal(true)} className="btn btn-outline-success" type="submit">Add Todo</button>
        </div>
      </nav>
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <div className="container mb-2 p-0" key={todo.id}>
            <TodoCard todoData={todo} onDelete={DeleteItem} />
          </div>
        ))
      ) : (
        <p>No todos found.</p>
      )}
      {showModal && (
        <AddTodo
          onClose={() => setShowModal(false)}
          onAdd={addTodo}
        />
      )}
    </div>
  );
}

export default App;
