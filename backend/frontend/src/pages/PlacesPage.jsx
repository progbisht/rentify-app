import { Link } from "react-router-dom"
import AccountNav from "../AccountNav"
import { useEffect, useState } from "react"
import axios from "axios"


export default function PlacePage(){

    const [places, setPlaces] = useState([])

    useEffect(() => {

        const fetch = async() => {
            try{
                const response = await axios.get('/api/v1/places/user-places')
                const { data } = response.data
                setPlaces(data)
                
            }
            catch(err){
                setPlaces('')
                console.log(err.message)
            }
        }

        fetch()
    }, [])
   
    return(
        <div>

            <AccountNav/>
            
           
            <div className="text-center">
                <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>

            <div className="mt-4">
                {
                    places.length > 0 && (
                        places.map((place) => (
                            <div key={place._id}>
                                <Link to={`/account/places/${place._id}`} className="flex gap-4 cursor-pointer border p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition">
                                    <div className="w-32 h-32 flex-none">
                                        {
                                            place.photos.length > 0 && (
                                                <img className="object-cover w-full h-full rounded-2xl" src={`https://rentify-app-wr4l.onrender.com/public/uploads/${place.photos[0]}`} alt="Place" />
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-xl font-semibold">{place.title}</h2>
                                        <p className="text-sm mt-2 text-gray-600">{`${place.description.slice(0, 250)}...`}</p>
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
