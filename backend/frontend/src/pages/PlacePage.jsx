import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import PropertyWidget from "../PropertyWidget"
import axios from "../api/axios"
import { UserContext } from "../UserContext"

export default function PlacePage() {

    const { user } = useContext(UserContext)
    
    const [place, setPlace] = useState([])
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    const [interestedUsers, setIntrestedUsers] = useState([])

    const { id } = useParams()

    const navigate = useNavigate()


    useEffect(() => {
        if(id){
            const fetch = async () => {
                try{
                    const response = await axios.get(`/api/v1/places/single-place/${id}`)
                    const { data } = response.data
                    setPlace(data);

                }
                catch(err){
                    setPlace([])
                    console.log(err.message);

                }
            }
    
            fetch()
        }

        
        
    }, [id])

    useEffect(() => {
        if(user){
            const fetch = async () => {
                try{
                    const response = await axios.get(`/api/v1/places/interested/${id}`)
                    const { data } = response.data
                
                    setIntrestedUsers(data);
                

                }
                catch(err){
                    setIntrestedUsers([])
                    console.log(err.message);

                }
            }
    
            fetch()
        }
    }, [user, id])


    const handleDeletePlace = async (id) => {
        try {
            const response = await axios.delete(`/api/v1/places/delete-place/${id}`)

            if(response.status === 200){
                navigate('/account/places')
            }
        } catch (err) {
            console.log(err.message)
        }
    }


    

    if(showAllPhotos){        
        return(
            <div className="absolute inset-0 bg-black text-white min-h-screen"> 
                <div className="bg-white p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-36 text-black">Photos of {place.title}</h2>
                        <button onClick={()=>setShowAllPhotos(false)} className="fixed right-8 top-8 flex py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {
                        place.photos?.length > 0 && (
                            place.photos.map((photo) => (
                                <div>
                                    <img src={"https://rentify-app-wr4l.onrender.com/public/uploads/" + photo} alt=""/>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        )
                
    }

    return (
        <>
            <div className="mt-4 bg-gray-100 px-8 pt-8 rounded-2xl">
                <h1 className="text-2xl">{place.title}</h1>
                <a className="flex gap-1 my-3 font-semibold underline" target="_blank" rel="noreferrer" href={'https://maps.google.com/?q=' + place.address}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    {place.address}
                </a>

                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                        <div className="flex overflow-hidden">
                            {
                                place.photos?.[0] && (
                                    <div>
                                        <img className="object-cover cursor-pointer w-full h-full" src={"https://rentify-app-wr4l.onrender.com/public/uploads/" + place.photos?.[0]} alt="img"/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="grid">
                            {
                                place.photos?.[1] && (
                                    <img className="aspect-square cursor-pointer object-cover" src={"https://rentify-app-wr4l.onrender.com/public/uploads/" + place.photos?.[1]} alt="img"/>
                                )
                            }
                            <div className="overflow-hidden">
                                {
                                    place.photos?.[1] && (
                                        <img className="aspect-square cursor-pointer object-cover relative top-2" src={"https://rentify-app-wr4l.onrender.com/public/uploads/" + place.photos?.[1]} alt="img"/>
                                    )
                                }
                            </div>
                        </div>
                        <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>

                            Show all photos
                        </button>
                    </div>
                </div>

                
                <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4 text-justify">
                            <h2 className="font-semibold text-2xl ">Description</h2>
                            {place.description}
                        </div>
                        Number of bedrooms : {place.bedRooms} <br/>
                        Number of bathrooms : {place.bathRooms} <br/>
                        Nearby Places : {place.nearby}
                        
                    </div>
                    
                    <PropertyWidget
                        place={place}
                        user={user}
                    />
                </div>
                {
                    user && user._id === place.owner && (
                        <>
                            <button className="primary my-4 cursor-pointer">
                                <Link to={`/account/places/edit/${id}`}>Edit Place</Link>
                            </button>
                            <button className="primary my-4 cursor-pointer" onClick={()=>handleDeletePlace(id)}>
                                Delete Place
                            </button>
                        </>
                    )
                }
            </div>

            {
                user && (
                    <>
                        <div className="mt-2 font-bold">Interested People : </div>
                        { 
                            interestedUsers.length > 0 ? interestedUsers.map((user) => (
                                <div key={user._id}>
                                    <div className="m-4 bg-gray-100 p-8 rounded-2xl">
                                        Name : {user.firstName + " " + user.lastName} <br/>
                                        Email : {user.email} <br/>
                                        Phone : {user.phone}
                                    </div>
                                
                                </div>
                            )) : (
                                <div>No interested people as of now.</div>
                            )
                        }
                    </>
                ) 
            }
            
        </>
        
    )
}