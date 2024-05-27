import { Link } from "react-router-dom"
import AccountNav from "../AccountNav"
import { useContext, useEffect, useState } from "react"
import axios from "../api/axios"
import { UserContext } from "../UserContext"


export default function PlacePage(){

    const { user } = useContext(UserContext)

    const [places, setPlaces] = useState([])

    useEffect(() => {

        const fetch = async() => {
            try{
                const response = await axios.get(`/api/v1/wishlist/${user._id}`)
                const { data } = response.data
                setPlaces(data)
                
            }
            catch(err){
                setPlaces('')
                console.log(err.message)
            }
        }

        fetch()
    }, [user])
   
    return(
        <div>

            <AccountNav/>
            
           

            <div className="mt-4">
                {
                    places.length > 0 && (
                        places.map((item) => (
                            <div key={item.place._id}>
                                <Link to={`/account/places/${item.place._id}`} className="flex gap-4 cursor-pointer border p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition">
                                    <div className="w-32 h-32 flex-none">
                                        {
                                            item.place.photos.length > 0 && (
                                                <img className="object-cover w-full h-full rounded-2xl" src={`https://rentify-app-wr4l.onrender.com/public/uploads/${item.place.photos[0]}`} alt="Place" />
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-xl font-semibold">{item.place.title}</h2>
                                        <p className="text-sm mt-2 text-gray-600">{`${item.place.description.slice(0, 250)}...`}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )
                }
            </div>
               
            
        </div>
    )
}
