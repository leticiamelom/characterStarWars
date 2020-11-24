import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/Star_Wars.png';

export default function Profile() {
  const [characters, setCharacters] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setCharacters(response.data);
    })
  }, [ongId]);

  async function handleDeleteCharacter(id) {
    try {
      await api.delete(`characters/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setCharacters(characters.filter(character => character.id !== id));
    } catch (err) {
      alert('Erro ao deletar personagem, tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Star Wars" />
        <span>Bem vindo, {ongName}.</span>

        <Link className="button" to="/characters/new">Cadastrar novo personagem</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Personagens Cadastrados</h1>

      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <strong>PERSONAGEM:</strong>
            <p>{character.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{character.description}</p>

            <button onClick={() => handleDeleteCharacter(character.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}