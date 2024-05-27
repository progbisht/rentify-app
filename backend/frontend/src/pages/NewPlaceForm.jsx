import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import { Navigate, useParams } from "react-router-dom"
import axios from "../api/axios"

export default function NewPlaceForm(){

    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhtots] = useState([])
    const [description, setDescription] = useState('')
    const [nearby, setNearby] = useState([])
    const [bedRooms, setBedRooms] = useState(0)
    const [bathRooms, setBathRooms] = useState(0)
    const [price, setPrice] = useState(0)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if(id){
            const fetch = async() => {
                try{
                    const response = await axios.get(`/api/v1/places/user-single-place/${id}`)
                    const { data } = response.data
    
                    setTitle(data.title)
                    setAddress(data.address)
                    setAddedPhtots(data.photos)
                    setDescription(data.description)
                    setNearby(data.nearby)
                    setBedRooms(data.bedRooms)
                    setBathRooms(data.bathRooms)
                    setPrice(data.price)           
                }
                catch(err){
                    console.log(err.message);
                }
            }
    
            fetch()
        }

    }, [])


    async function handleUploadPhotos(e) {
        const files = e.target.files;
        const data = new FormData()

        for(let i=0; i<files.length; i++){
            data.append('photos', files[i])
        }

        const response = await axios.post('/api/v1/places/upload', data, {
            headers: 'Content-Type: multipart/form-data'
        })

        
        const { data: fileName } = response.data
        const allFiles = fileName.map((file) => (
            file = file.split('\\')[2]
        ))
        

        setAddedPhtots(prev => (
            [...prev, ...allFiles]
        ))

    }


    async function savePlace(e) {
        e.preventDefault()
        const placeData = {
            title, address, photos: addedPhotos, description, nearby, bedRooms, bathRooms, price
        }

        if(id){
            const response = await axios.patch('/api/v1/places/update-place', { id, ...placeData })
            if(response.status === 200){
                setRedirect(true)
            }
        }
        else{
            const response = await axios.post('/api/v1/places/add-place', placeData)
            if(response.status === 201){
                setRedirect(true)
            }
        }
        
        
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    function handleRemovePhoto(e, fileName){
        e.preventDefault()
        setAddedPhtots([...addedPhotos.filter(photo => photo !== fileName)])
    }

    function handleMainPhoto(e, fileName){
        e.preventDefault()
        setAddedPhtots([fileName, ...addedPhotos.filter(photo => photo !== fileName)])
    }

    return (
        <div className="">
            <AccountNav/>
            <form onSubmit={savePlace}>

                <label htmlFor="title" className="text-2xl mt-4">Title</label>
                <p className="text-gray-500 text-sm">Title for your place. It should be short and concise.</p>
                <input 
                    type="text" 
                    id="title" 
                    placeholder="Title: My Apartment"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                />

                <label htmlFor="address" className="text-2xl mt-4">Address</label>
                <p className="text-gray-500 text-sm">Address of your place</p>
                <input 
                    type="text" 
                    id="address" 
                    placeholder="Address to this place"
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                />

                <label htmlFor="photos" className="text-2xl mt-4">Photos</label>
                <p className="text-gray-500 text-sm">Pictures of your place</p>
                

                <div className="mt-2 mb-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    { 
                        addedPhotos.length > 0 && addedPhotos.map((link) => (
                                <div key={link} className="h-64 flex relative">
                                    <img className="rounded-2xl w-full object-cover" src={"https://rentify-app-wr4l.onrender.com/public/uploads/" + link} alt={link}/>
                                    <button onClick={(e) =>handleRemovePhoto(e, link)} className="absolute cursor-pointer bottom-1 right-1 p-2 text-white bg-black bg-opacity-50 border rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>

                                    </button>
                                    <button onClick={(e) =>handleMainPhoto(e, link)} className="absolute cursor-pointer bottom-1 left-1 p-2 text-white bg-black bg-opacity-50 border rounded-xl">
                                        {
                                            link === addedPhotos[0] && (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                </svg>

                                            )
                                        }

                                        {
                                            link !== addedPhotos[0] && (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                            )
                                        }


                                    </button>
                                </div>
                            )
                        )
                    }
                    <label className="h-64 cursor-pointer flex justify-center items-center border bg-transparent rounded-2xl p-4 text-2xl text-gray-500">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUploadPhotos}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </label>
                        
                </div>

                <label htmlFor="description" className="text-2xl mt-4">Description</label>
                <p className="text-gray-500 text-sm">Description of your place</p>
                <textarea 
                    id="description"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                />

                <label htmlFor="nearby" className="text-2xl mt-4">Nearby</label>
                <p className="text-gray-500 text-sm">Enter nearby places like school, hospital, colleges etc.</p>
                <textarea 
                    id="description"
                    value={nearby}
                    onChange={e=>setNearby(e.target.value)}
                />

            

                <label htmlFor="checkTime" className="text-2xl mt-4">Number of rooms</label>
                <p className="text-gray-500 text-sm">Add bedrooms and bathrooms including hall</p>
                <div className="grid sm:grid-cols-3 gap-1">
                    <div>
                        <label className="mt-2 -mb-1 text-gray-500">Number of Bedrooms</label>
                        <input 
                            type="number" 
                            placeholder="0"
                            value={bedRooms}
                            onChange={e=>setBedRooms(e.target.value)}
                        />
                        
                    </div>
                    <div>
                        <label className="mt-2 -mb-1 text-gray-500">Number of Bathrooms</label>
                        <input 
                            type="number" 
                            placeholder="0"
                            value={bathRooms}
                            onChange={e=>setBathRooms(e.target.value)}
                        />
                        
                    </div>
                    
                    
                    <div>
                        <label className="mt-2 -mb-1 text-gray-500">Price</label>
                        <input 
                            type="number"
                            value={price}
                            onChange={e=>setPrice(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button className="primary text-white my-4">Save</button>
                </div>

            </form>
        </div>
    )
}