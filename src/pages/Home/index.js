
import { useState } from "react"
import './home.css';

import { Link } from "react-router-dom";

import { auth } from '../../firebaseConection'
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    
    async function handleLogin(e){
      e.preventDefault();

      if(email !== '' && password !== ''){
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // navegar para /admin
          navigate('/admin', { replace: true})
          setEmail('')
          setPassword('')
        })
        .catch(() => {
          console.log("ERRO AO FAZER O LOGIN")
        })

      }else{
        alert("Preefcha todos os Campos!")
      }
      
    }

    return (
      <div className="home-container">
        <h1>Lista de Tarefas</h1>
        <span>Gerencie sua Agenda de Forma Fácil.</span>

        <form className="form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

<input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value) }
        />

          <button type="submit" >Acessar</button>
        </form>

        <Link className="button-link" to="/register">
          Não Possui uma Conta? Cadastre-se
        </Link>
        
      </div>
    )
  }
  
