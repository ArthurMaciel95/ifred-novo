import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  LoadScript
} from "@react-google-maps/api";
import { MdOutlineSportsMotorsports } from 'react-icons/md'
import mapStyles from "./styles";
import { useFetch } from "../../../services/useFetch";
import { toast } from 'react-toastify';
import { useAppContext } from '../../../context/useContext'
import Cookies from "js-cookie";
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: -1.421,
  lng: -48.44,
};

export const SectionGoogleMaps = ({ handleStart }) => {
  const { setStart, start } = useAppContext()
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  /*const Maker = () => <img src='/img/pointergooglemaps.png' className="w-14 h-18" alt=" pino do google maps " />;*/
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAXVy2ejGB5cOb_FPd0J2mhxaMjJ4It6JA",
  });

  if (loadError) {
    toast.error('um erro ocorreu!')
  }

  setInterval(() => {
    if (Cookies.get('expire') !== new Date().getHours()) {
      setStart(false)

    }

  }, 3600000);

  let mapRef = React.useRef();


  const { data, error } = useFetch('https://ifred-location-beta.vercel.app/api/location')

  if (error) {
    toast.error('Erro na transmissão de dados!')
  }
  const onMapLoad = React.useMemo((map) => {
    mapRef.current = map;

    setMarkers(data && data.results)
  }, [selected, markers, data]);


  /*   const onMapClick = React.useCallback((event) => {
      setMarkers((current) => [
        ...current,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]);
    }, []); */



  /*   const motocyclist = [
      { lat: -1.4565248581365091, lng: -48.47728001717063 , author:'Felipe dos santos'},
      { lat: -1.4565463088755397, lng: -48.480584498676976 , author:'Gabriel salazar'},
      { lat: -1.45474444608463, lng: -48.475627776417454 , author:'Arthur Nogueira'},
      { lat: -1.4546157415444823, lng: -48.4689544403884 , author:'Frank Goldberg'},
      { lat: -1.4585400914080233, lng: -48.48693256260455 , author:'Juliana figueredo'},
      { lat: -1.4293939639205469, lng: -48.489977063304536 , author:'Paulo aguiar'},
      { lat: -1.4385749713892577, lng: -48.48572844422495 , author:'Matheus franco' },
      { lat: -1.44183550721975, lng: -48.458520115977876 , author:'Túlio masquerano'},
      { lat: -1.4656538409159332, lng: -48.468811066419484 , author:'Felipe nogueira'},
      { lat: -1.4599050588191724, lng: -48.44688132551372 , author:'Júlio Rocha'},
    ]; */

  return (
    // Important! Always set the container height explicitly
    <div className="relative">

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={options}
          onLoad={onMapLoad}
          onBoundsChanged={onMapLoad}
          onClick={onMapLoad}
          className="relative"
        >
          <img src="img/logo_ifred.png" alt="logo da empresa ifred entregas" className="absolute top-5 left-5 opacity-80 w-20" />
          <button className="absolute top-5 right-4 px-4 py-2 bg-black text-white" onClick={() => setStart(false)}>Parar Transmissão</button>
          {markers && markers.map((marker) => {
            return <Marker

              key={marker._id}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              icon={{
                url: "img/pin.svg",
                scaledSize: new window.google.maps.Size(30, 30),
              }}

              onMouseUp={() => {
                setSelected(marker);
              }}
            />
          })}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.latitude, lng: selected.longitude }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div className="bg-white rounded-lg h-10 w-auto flex items-center flex-col">
                <div className=" flex items-center">
                  <MdOutlineSportsMotorsports size={16} />   {<p className="ml-2 text-[10px] font-bold">{selected.user_id ? selected.user_id : 'Desconhecido'}</p>}
                </div>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
    </div>
  );
};
