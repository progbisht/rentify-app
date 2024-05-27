import { createContext, useEffect, useState } from "react";
import axios from "./api/axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState('');
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if(!user){
            const fetch = async() => {
                try{
                    const response =  await axios.get('/api/v1/users/profile')
                    const { data } = response.data
                    
                    setUser(data)
                    setReady(true)
                    
                }
                catch(err){
                    setUser('')
                    setReady(false)
                    console.log(err.message)
                }
            }
            fetch()
        }

    },[user])

    
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}