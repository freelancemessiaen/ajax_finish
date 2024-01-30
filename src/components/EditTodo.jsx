import { useState } from 'react';
import Button from './Button';

export default function EditTodo({ todo, updateTodo }) {
  const [value, setValue] = useState(todo.content);
  const [loading, setLoading] = useState(false);

  async function tryUpdateTodo (newTodo) {
  try {
    setLoading(true);
    const {_id, ...update} = newTodo;
    const response = await fetch(`https://restapi.fr/api/rtodo/${ todo._id }`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const newTodo = await response.json();
      updateTodo(newTodo);
    } else {
      console.log('Erreur');
    }
  } catch (error) {
    console.log('Erreur');
  }
  finally {
    setLoading(false);
  }
}


  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.length) {
      tryUpdateTodo({...todo,content: value, edit: false})
      setValue('');
    }
  }

  function handleClick() {
    if (value.length) {
     tryUpdateTodo({...todo,content: value, edit: false})
      setValue('');
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-10">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        className="mr-15 flex-fill"
        placeholder="Ajouter une tâche"
      />
      <Button text="Sauvegarder" className="mr-15" onClick={handleClick} />
      <Button text="Annuler" className="mr-15" onClick={ () => tryUpdateTodo({ ...todo, edit: false})} />
    </div>
  );
}