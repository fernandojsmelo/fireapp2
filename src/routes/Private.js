import { useState, useEffect } from "react";

import { auth } from "../firebaseConection";
import { onAuthStateChanged } from "firebase/auth";

import { Navigate } from "react-router-dom";

export default function Private({ children }){
    const [loading, setloading] = useState(true);
    const [signed, setSingned] = useState(false);
    
    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                // se tem user logado
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setloading(false);
                    setSingned(true);
                }else{
                    // nao Possui user Logado
                    setloading(false);
                    setSingned(false);
                }
            })
        }

        checkLogin();
    }, [])

    if(loading){
        return(
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to="/"/>
    }
    return children;
}