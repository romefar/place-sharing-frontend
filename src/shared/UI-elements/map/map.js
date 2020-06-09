import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import httpConfig from '../../../config/http-config'

import './map.css'

const Map = ({ className = '', center, zoom }) => {
  const mapRef = useRef()

  useEffect(() => {
    const ol = window.ol
    const map = new ol.Map({
      target: mapRef.current.id,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    })

    const layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([parseFloat(center.lng), parseFloat(center.lat)], 'EPSG:4326', 'EPSG:3857'))
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: `${httpConfig.getDomain()}/assets/marker.png`
        })
      })
    })
    map.addLayer(layer)
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
