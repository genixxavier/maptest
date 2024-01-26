import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleMyLocation = () => {
    if (!isMapReady) throw new Error("Map is not ready");
    if (!userLocation) throw new Error("User location is not ready");
    map?.flyTo({ center: userLocation });
  };
  return (
    <button
      onClick={handleMyLocation}
      className="btn btn-primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
      }}
    >
      BtnMyLocation
    </button>
  );
};
