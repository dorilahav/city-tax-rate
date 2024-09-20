import cities from './data.json' with { type: "json" };
import path from 'path';
import fs from 'fs/promises';

const getCityData = async cityNumber => {
  const cityData = await fs.readFile(path.join('output', cityNumber.toString(), 'city-data.json'));

  return JSON.parse(cityData);
}

const newCities = await Promise.all(cities.map(async x => {
  const data = await getCityData(x.number);

  x.data = data;

  return x;
}));

await fs.writeFile(path.join('output', 'cities.json'), JSON.stringify(newCities, null, 2));
console.log('Done');