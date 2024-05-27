import { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

export default function PropertyWidget({place, user}) {
   
    const [redirect, setRedirect] = useState("")

    


    const handleBookThisPlace = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post('/api/v1/wishlist/add',{
                place: place._id,
            })
            
            if(response.status === 200){
                setRedirect(`/account/wishlist`)
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    if(redirect){
        return (
            <Navigate to={redirect}/>
        )
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: {place.price}
            </div>

            {
                place.owner !== user._id && (
                    user && (
                        <button onClick={handleBookThisPlace} className='primary mt-4' > 
                            Intrested &nbsp;
                            
                        </button>
                    )

                )
            }

        </div>
    )
}