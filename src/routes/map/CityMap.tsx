import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import { CityData } from '../../types';

const israelCenter = [31.0461, 34.8516] as [number, number];

const getColorByTaxRate = (rate: number) => {
  if (rate === 20) {
    return 'darkgreen';
  }

  if (rate === 18) {
    return 'limegreen';
  }

  if (rate === 16) {
    return 'yellowgreen';
  }

  if (rate === 14) {
    return 'yellow';
  }

  if (rate === 12) {
    return 'orange';
  }

  return 'red';
}

const calculateReturn = ({maxSalaryAmount, taxReturnRate}: CityData) => {
  const salaries = [20000, 40000, 80000];

  return salaries
    .map(x => x * 12)
    .map(x => Math.min(x, maxSalaryAmount))
    .map(x => (x * taxReturnRate) / 100)
    .reduce((a, b) => a + b, 0);
}

function CityMap({cities}: {cities: CityData[]}) {
  return (
    <MapContainer center={israelCenter} zoom={8} style={{width: '100%', height: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {
        cities.filter(x => x.taxReturnRate >= 14).map(x => (
            <GeoJSON key={x.number} data={x.data.geojson} style={{color: getColorByTaxRate(x.taxReturnRate)}}>
              <Tooltip>
                <div>{x.name}</div>
                <div>
                  החזר מס: {x.taxReturnRate}
                </div>
                <div>
                  תקרת החזר: {x.maxSalaryAmount}
                </div>
                <div>
                  החזר צפוי: {calculateReturn(x)}
                </div>
              </Tooltip>
            </GeoJSON>
        ))
      }
    </MapContainer>
  )
}

export default CityMap;