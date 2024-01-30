import { useState } from 'react';
import Button from './Button';

export default function TodoItem({
  todo,
  deleteTodo,
  updateTodo
}) {
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
      }
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

async function handleClickdeleteTodo  () {
  try {
    setLoading(true);
    const response = await fetch(`https://restapi.fr/api/rtodo/${todo._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      deleteTodo(todo);
    }else {
      console.log('Erreur');
    }
  } catch (e) {
      console.log('Erreur');
  }finally {
    setLoading(false);
  }
}

  return (
    <li className={'mb-10 d-flex flex-row justify-content-center align-items-center p-10'}>
      <span className="flex-fill">
        {todo.content} {todo.done && '✅'}
      </span>
      <Button
        text="Valider"
        className="mr-15"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({...todo, done: !todo.done})
        }}
      />
      <Button
        text="Modifier"
        className="mr-15"
        onClick={(e) => {
          e.stopPropagation();
           tryUpdateTodo({...todo, edit: true})
        }}
      />
      <Button
        text="Supprimer"
        onClick={(e) => {
          e.stopPropagation();
          handleClickdeleteTodo();
        }}
      />
    </li>
  );
}