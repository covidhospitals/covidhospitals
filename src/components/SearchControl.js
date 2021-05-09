
import { DivIcon } from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

import "leaflet-geosearch/assets/css/leaflet.css"
import { useMap } from 'react-leaflet';

const provider = new OpenStreetMapProvider({
    params: {
        // 'accept-language': 'en', // render results in Dutch
        countrycodes: 'IN', // limit search results to the Netherlands
        // addressdetails: 1, // include additional address detail parts
    }
}
);

var gsc
export default function SearchControl(props) {
    const map = useMap()
    if (!gsc) {
        gsc = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: true,
            searchLabel: 'Find a place',
            marker: {
                icon: new DivIcon({
                    html: '<i class="fa fa-map-marker fa-3x search-marker"></i>',
                })
            }
        })
        map.addControl(gsc);
    }
    return null;
}
