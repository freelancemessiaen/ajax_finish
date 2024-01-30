import { useState } from 'react';
import Button from './Button';

export default function AddTodo({ addTodo }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.length) {
          createTodo();
          setValue('');
    }
  }

  async function createTodo() {
        // Début du bloc try-catch pour gérer les erreurs potentielles
    try {
      setLoading(true);
      // Envoi d'une requête POST asynchrone à l'API 'https://restapi.fr/api/rtodo'
      const response = await fetch('https://restapi.fr/api/rtodo', {
        method: "POST", // Méthode HTTP de la requête
        body: JSON.stringify({ // Corps de la requête converti en format JSON
          content: value, // Valeur à envoyer
          edit: false, // Indicateur de modification, défini sur false par défaut
          done: false // Indicateur d'achèvement, défini sur false par défaut
        }),
        headers: { // En-têtes de la requête
          'Content-type': 'application/json' // Type de contenu : JSON
        }
      })
      // Vérifie si la réponse de la requête est OK (code de statut 200-299)
      if (response.ok) {
        // Si la réponse est OK, attend la conversion de la réponse JSON en objet JavaScript
        const todo = await response.json();
        // Ajoute le todo à la liste des todos affichés
        addTodo(todo);
      }
    // Attrape les erreurs potentielles et les affiche dans la console
    } catch (error) {}
    finally {
           setLoading(false);
    }
    // Réinitialise la valeur de la variable 'value' après l'envoi de la requête
    setValue('');
  }

 function handleClick() {
  // Vérifie si la longueur de la valeur est supérieure à 0
  if (value.length) {
    createTodo();
  }
}


  return (
    <div className="d-flex justify-content-center align-items-center mb-20">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        className="mr-15 flex-fill"
        placeholder="Ajouter une tâche"
      />
      <Button text="Ajouter" onClick={handleClick} />
    </div>
  );
}