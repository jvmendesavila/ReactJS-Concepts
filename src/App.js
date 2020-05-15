import React, { useEffect } from "react";

import "./styles.css";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  // UseEffects
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  // 📋1️⃣ should be able to add new repository
  async function handleAddRepository() {
    // New Object
    const newRepository = {
      title: "Desafio Node.js",
      url: "http://github.com/...",
      techs: ["Node.js", "React.js"],
    };

    const response = await api.post("repositories", newRepository);

    const repository = response.data;

    // ➕ Add to the list
    setRepositories([...repositories, repository]);
  }

  // 📋2️⃣ should be able to remove repository
  async function handleRemoveRepository(project) {
    const response = await api.delete(`repositories/${project.id}`);

    // ➖ Remove to the list
    const newList = repositories.filter((p) => {
      return p.id !== project.id;
    });

    // Setting new list
    setRepositories(newList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((project) => (
          <li>
            {project.title}
            <button onClick={() => handleRemoveRepository(project)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
