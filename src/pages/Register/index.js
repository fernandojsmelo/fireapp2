
import { useState } from "react"

import { Link } from "react-router-dom";
import { auth } from '../../firebaseConection'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    async function handleRegister(e){
      e.preventDefault();

      if(email !== '' && password !== ''){
        await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true})
        })
        .catch(()=> {
          console.log("ERRO AO FAZER LOGIN")
        })

      }else{
        alert("Preefcha todos os Campos!")
      }
      
    }

    return (
      <div className="home-container">
        <h1>Cadastre-se</h1>
        <span>Vamos Criar Sua Conta</span>

        <form className="form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
          
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" >Cadastra</button>
        </form>

        <Link className="button-link" to="/">
          Já Possui uma Conta? Faça Login!
        </Link>
        
      </div>
    )
  }
  
