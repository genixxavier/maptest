import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { ReactNode, useContext, useEffect, useReducer } from "react";
import { mapReducer } from "./mapReducer";
import { MapContext } from "./MapContext";
import { PlacesContext } from "..";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: ReactNode;
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const {places} = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup({ offset: 25 }).setHTML(
        `<h4>${place.text}</h4><p>${place.place_name}</p>`
      );

      const marker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map!);

        newMarkers.push(marker)

      dispatch({ type: "setMarkers", payload: newMarkers });
    }

    console.log(places);
  }, [places])

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup({ offset: 25 }).setHTML(
      `<h4>Here</h4><p>My location</p>`
    );

    new Marker()
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);
    dispatch({ type: "setMap", payload: map });
  };

  const getRouterBetweenPoints = async( start: [number, number], end: [number, number] ) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry

    let kms = distance / 1000
    kms = Math.round(kms * 100) / 100
    const minutes = Math.floor(duration / 60)

    console.log({kms, minutes, geometry})
    console.log('data', resp)

    const bounds = new LngLatBounds(start, start)

    for(const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds, {
      padding: 100
    })

    //polyline
    const sourceData: AnySourceData = {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coords
        }
      }
    }

    if(state.map?.getSource('route')) {
      state.map?.removeLayer('route')
      state.map?.removeSource('route')
    }

    state.map?.addSource('route', sourceData)
    state.map?.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#0a1e2c',
        'line-width': 5,
        'line-opacity': 0.75
      }
    })

  }

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouterBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
