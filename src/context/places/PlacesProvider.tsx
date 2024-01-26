import { ReactNode, useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponde } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const initialState: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[] | ReactNode;
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, initialState);

  useEffect(() => {
    getUserLocation().then((userLocation) => {
      dispatch({ type: "setUserLocation", payload: userLocation });
    });
  }, []);

  const searchPlacesByTerm = async (term: string): Promise<Feature[]> => {
    if(term.length === 0) {
      dispatch({ type: "setPlaces", payload: []})
      return []
    }
    if(!state.userLocation) throw new Error("User location not found");

    dispatch({ type: "setLoadingPlaces"})


    const resp = await searchApi.get<PlacesResponde>(`/${term}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "setPlaces", payload: resp.data.features})
    return resp.data.features;
  }

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
      {children}
    </PlacesContext.Provider>
  );
};
