import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/Star_Wars.png';
import elencoImg from '../../assets/elenco2.png';


export default function Profile() {
  const [characters, setCharacters] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('/', {
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

        <Link className="button" to="/characters/new">Cadastrar novo personagem</Link>
        
      </header>

      <h1>Faça parte do universo Star Wars</h1>

      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <strong>PERSONAGEM:</strong>
            <p>{character.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{character.description}</p>

          </li>
        ))}
      </ul>

      <img src={elencoImg} alt="Elenco" />

    </div>
  );
}