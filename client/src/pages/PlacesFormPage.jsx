import { useEffect, useState } from "react"
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if(!id) {
            return
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response
            setTitle(data.title)
            setAddress(data.address)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setAddedPhotos(data.photos)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })
    }, [id])

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    async function savePlace(ev) {
        ev.preventDefault()
        const placeData = {
            title, address, description, 
            perks, extraInfo, checkIn, 
            checkOut, addedPhotos, maxGuests
        }
        if(id) {
            // update place
            await axios.put('/places', {
                id, ...placeData
            })
        } else {
            // new place
            await axios.post('/places', placeData)
        }
        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
                    <form onSubmit={savePlace}>
                        {inputHeader('Title')}
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="for example: My lovely apt" />
                        {inputHeader('Address')}
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address to this place" />
                        {inputHeader('Photos')}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                        {inputHeader('Description')}
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        {inputHeader('Perks')}
                        <p className="text-gray-500 text-sm">Select all the perks available at your place.</p>
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {inputHeader('Extra info')}
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                        {inputHeader('Check in & out timings')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check In time</h3>
                                <input type="text" 
                                        value={checkIn} 
                                        onChange={e => setCheckIn(e.target.value)} 
                                        placeholder="11" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check Out time</h3>
                                <input type="text" 
                                        value={checkOut} 
                                        onChange={e => setCheckOut(e.target.value)} 
                                        placeholder="11" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max guests</h3>
                                <input type="number" 
                                        value={maxGuests} 
                                        onChange={e => setMaxGuests(e.target.value)} />
                            </div>
                        </div>
                        <button className="primary my-4" type="submit">Save</button>
                    </form>
                </div>
    )
}