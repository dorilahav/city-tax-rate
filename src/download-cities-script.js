import qs from 'querystring';
import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import cities from './data.json' with { type: "json" };
import { PromisePool } from '@supercharge/promise-pool'


const checkFolder = async (folder) => {
  try {
    await fs.stat(folder);
    return true;
  } catch {
    return false;
  }
}

const writeToDisk = async (folder, jsonFileName, data) => {
  folder = path.join('output', folder);

  const doesFolderExist = await checkFolder(folder);
  if (!doesFolderExist){
    await fs.mkdir(folder, {recursive: true});
  }

  await fs.writeFile(path.join(folder, `${jsonFileName}.json`), JSON.stringify(data, null, 2));
}

const getCityUrl = cityName => `https://nominatim.openstreetmap.org/search.php?q=${qs.escape(cityName)}&polygon_geojson=1&format=json`;

const getCitySearchResults = async (cityName) => {
  const cityUrl = getCityUrl(cityName);

  const response = await axios.get(cityUrl);
  return response.data;
}

const getCityDataFromSearchResults = (city, searchResults) => {
  const places = searchResults.filter(x => x.class === 'place');

  if (places.length === 0) {
    console.log(`Didn't find place for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)

    return searchResults[0];
  }

  if (places.length > 1) {
    console.log(`Found more than 1 place for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)
  }

  console.log(`Found exactly 1 place for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)

  return places[0];
}

const main = async city => {
  console.log(`Fetching data for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)
  const searchResults = await getCitySearchResults(city.name);
  console.log(`Writing search results for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)
  await writeToDisk(city.number.toString(), 'search-results', searchResults);

  if (searchResults.length === 0) {
    console.log(`Found no results for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)
    return undefined;
  }
  
  console.log(`Picking right result for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)
  const cityData = getCityDataFromSearchResults(city, searchResults);
  
  console.log(`Writing data for city number: ${city.number.toString().padStart(4, '0')} name: "${city.name}"...`)
  await writeToDisk(city.number.toString(), 'city-data', cityData);

  return cityData;
}

const { results, errors } = await PromisePool
  .withConcurrency(5)
  .for(cities)
  .process(main)

if (errors && errors.length) {
  console.error('Found errors:');
  console.error(errors);
}

await writeToDisk('all', 'cities', results.filter(x => x));

console.log('Done');