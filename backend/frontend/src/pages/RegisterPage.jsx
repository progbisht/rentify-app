import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios"



export default function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(e){
        e.preventDefault();
        try{
            await axios.post('/api/v1/users/register', {
                firstName,
                lastName,
                phone,
                email,
                password
            })

            alert('Registraton Sucessful. Now you can login to your account.')
        }
        catch(err){
            alert('Regsitration Failed!. Please try after sometime.')
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto " onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="John" 
                        value={firstName}
                        onChange={e=>setFirstName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Doe" 
                        value={lastName}
                        onChange={e=>setLastName(e.target.value)}    
                    />
                    <input 
                        type="number" 
                        placeholder="9999999999" 
                        value={phone}
                        onChange={e=>setPhone(e.target.value)}    
                    />
                    <input 
                        type="email" 
                        placeholder="youremail@gmail.com" 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}    
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <button className="primary">Register</button>

                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link to={'/login'} className=" underline text-black">Login</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}