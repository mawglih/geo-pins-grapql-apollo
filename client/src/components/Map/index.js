import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import PinIcon from '../PinIcon';
import Context from '../../context';
import { withStyles } from '@material-ui/core/styles';

const INITIAL_VIEWPORT = {
  latitude: 40.7517,
  longitude: -73.9868,
  zoom: 11,
  width: '100vw',
  height: 'calc(100vh - 64px',
};

const Map = ({
  classes,
}) => {
  const { state, dispatch } = useContext(Context);
  const [viewport, setViewPort] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);
  useEffect(() => {
    getUserPosition()
  }, []);

  const getUserPosition = () => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setViewPort({...viewport, latitude, longitude})
        setUserPosition({ latitude, longitude })
        console.log({ latitude, longitude})
      })
    }
  }

  const handleMapClick = ({ lngLat, leftButton }) => {
    if(!leftButton) return;
    if(!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' })
    }
    const [longitude, latitude] = lngLat;
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude }
    })

  }

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapstyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken="pk.eyJ1Ijoib2xpdmFub3YiLCJhIjoiY2p3aDV2eDQ3MDNmYTQzbnNrb2NhYnNxdSJ9.n41i1FLoR5a3mobcL580rQ"
        onViewportChange={newViewport => setViewPort(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
        <div className={styles.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewPort(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon
              size={30}
              color="red"
            />
          </Marker>
        )}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
            >
            <PinIcon
              size={30}
              color="blue"
            />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
}

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
