const map = new maplibregl.Map({
    container: 'map',
    style: {
        "version": 8,
        "sources": {},
        "layers": []
      },
    center: [70, 20],
    zoom: 2
  });

map.on('load', () => {
    map.addLayer({
        id: 'background',
        type: 'background',
        paint: {
            'background-color': '#CEF5FD',
        }
    })

    map.addSource('countries', {
        type: 'geojson',
        data: './data/countries.geojson',
        attribution: 'Natural Earth'
    })

    map.addLayer({
        id: 'countries-layer-fill',
        type: 'fill',
        source: 'countries',
        paint: {
            'fill-color': ['match', ['get', 'MAPCOLOR7'], 1, 'lightpink', 'white'],
        }
    })
    map.addLayer({
        id: 'countries-layer-outline',
        type: 'line',
        source: 'countries',
        paint: {
            'line-color': ['match', ['get', 'MAPCOLOR7'], 1, 'red', 'lightpink'],
            'line-width': 0.5,
        }
    })

    map.addSource('cities', {
        type: 'geojson',
        data: './data/cities.geojson',
    })

    map.addLayer({
        id: 'cities-layer',
        type: 'circle',
        source: 'cities',
        paint: {
            'circle-color': ['match', ['get', "NAME"], "Moscow", 'red','blue'],
            'circle-radius': ['match', ['get', "NAME"], "Moscow", 5, 3]
        },
        filter: ['>', ['get', 'POP_MAX'], 1000000]
    })

    map.addSource('rivers', {
        type: 'geojson',
        data: './data/rivers.geojson'
    })

    map.addLayer({
        id: 'rivers-layer',
        type: 'line',
        source: 'rivers',
        paint: {
            'line-color': 'lightblue',
            'line-width': 1.5
        }
    })

    map.addSource('lakes', {
        type: 'geojson',
        data: './data/lakes.geojson'
    })

    map.addLayer({
        id: 'lakes-layer-outline',
        type: 'line',
        source: 'lakes',
        paint: {
            'line-color': 'lightblue',
            'line-width': 3,
        },
    }) 
    map.addLayer({  
        id: 'lakes-layer-fill',
        type: 'fill',
        source: 'lakes',
        paint: {
            'fill-color': '#CEF5FD'
        }
    })

    map.on('click', ['cities-layer'], (e) => {
        console.log(e)
        console.log(e.features)
        new maplibregl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.NAME_RU)
            .addTo(map);
    })

    map.on('mouseenter', 'cities-layer', () => {
        map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'cities-layer', () => {
        map.getCanvas().style.cursor = ''
    })

    })

    map.on('click', ['countries-layer-fill'], (e) => {
        console.log(e)
        console.log(e.features)
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.NAME_RU)
            .addTo(map);
    })

    map.on('mouseenter', 'countries-layer-fill', () => {
        map.getCanvas().style.cursor = 'crosshair'
    })
    map.on('mouseleave', 'countries-layer-fill', () => {
        map.getCanvas().style.cursor = ''
    })