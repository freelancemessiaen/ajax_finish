import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import ThemeContext from './context/ThemeContext';

function App() {
  const [theme, setTheme] = useState('primary');
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchTodoList() {
      try {
        const reponse = await fetch('https://restapi.fr/api/todo');
        if (reponse.ok) {
          const todos = await reponse.json();
          if (!ignore) {
            if (Array.isArray(todos)) {
              setTodoList(todos);
            } else {
              setTodoList([todos]);
            }
          }
        } else {
          console.error('une erreur');
        }
      } catch (e) {
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    fetchTodoList();
    return () => {
      ignore = true;
    };
  }, []);



      function updateTodo(updateTodo) {
    setTodoList(todoList.map((todo) => (todo._id === updateTodo._id ? updateTodo : todo))
    );
  }

  
      function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function deleteTodo(deletedTodo) {
    setTodoList(todoList.filter((todo) => todo._id !== deletedTodo._id));
  }


  function handleThemeChange(e) {
    setTheme(e.target.value);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="d-flex justify-content-center align-items-center p-20">
        <div className="card container p-20">
          <h1 className="mb-20 d-flex justify-content-center align-items-center">
            <span className="flex-fill">Liste de tâches</span>
            <select value={theme} onChange={handleThemeChange}>
              <option value="primary">Rouge</option>
              <option value="secondary">Bleu</option>
            </select>
          </h1>
          <AddTodo addTodo={addTodo} />
          <TodoList
            todoList={todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
           />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;