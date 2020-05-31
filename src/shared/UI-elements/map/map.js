import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './map.css'

const Map = ({ className = '', center, zoom }) => {
  const mapRef = useRef()

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const map = new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    })
  }, [center, zoom])

  return (
    <div
      ref={mapRef}
      className={`map ${className}`}
      id="map"
    ></div>
  )
}

Map.propTypes = {
  className: PropTypes.string,
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired
}

export default Map
