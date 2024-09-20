import rawcities from './cities.json';
import CityMap from './routes/map';
import { CityData } from './types';

const cities = rawcities as CityData[];

export default function App() {
  return (
    <div style={{width: '100vw', height: '100vh'}}>

      <CityMap cities={cities}/>
    </div>
  )
}