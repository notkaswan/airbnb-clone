import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {
      if(!id) {
        return
      }
      axios.get(`/place/${id}`).then(response => {
        setPlace(response.data)
      })
    }, [id])
  return (
    <div>
        place page: {id}
    </div>
  )
}
