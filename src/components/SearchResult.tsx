import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { LoadingPlaces } from "."
import { Feature } from "../interfaces/places"

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation }  = useContext(PlacesContext)
  const { map, getRouterBetweenPoints } = useContext(MapContext)
  const [activeId, setActiveId] = useState('')

  const handlePlaceClick = (place: Feature) => {
    setActiveId(place.id)
    const [lng, lat] = place.center

    map?.flyTo({
      center: [lng, lat],
      zoom: 15
    })
  }

  const getRoute = async (place: Feature) => {
    if(!userLocation) return
    const [lng, lat] = place.center
    const data = await getRouterBetweenPoints(userLocation, [lng, lat])
    console.log(data)
  }


  if(isLoadingPlaces) return (
    <LoadingPlaces />
  )

  if(!places.length) return (
    <div className="text-center mt-3">
      <p>Search result will appear here</p>
    </div>
  )

  return (
    <ul className="list-group mt-3">
      { places.map(place => (
        <li className={`list-group-item list-group-item-action pointer ${(activeId === place.id) ? 'active': ''}`} key={place.id} onClick={() => handlePlaceClick(place)}>
          <h6>{place.text}</h6>
          <p style={{fontSize: '12px'}}>{place.place_name}</p>
          <button className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`} onClick={() => getRoute(place)} >Address</button>
        </li>
      ))}
    </ul>
  )
}