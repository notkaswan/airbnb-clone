import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
        setAddedPhotos(prev => {
            return [...prev, filename]
        })
        setPhotoLink('')
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {inputHeader('Title')}
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="for example: My lovely apt" />
                        {inputHeader('Address')}
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address to this place" />
                        {inputHeader('Photos')}
                        <div className="flex gap-2">
                            <input value={photoLink} 
                                    onChange={e => setPhotoLink(e.target.value)} 
                                    type="text" placeholder={'Add using link (.jpg)'} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-3xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+link} alt='' />
                                </div>
                            ))}
                            <button className="flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            Upload
                            </button>
                        </div>
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
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}