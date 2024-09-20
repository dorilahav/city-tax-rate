import cities from '../output/all/cities.json' with { type: "json" };

console.log(new Set(cities.filter(x => x.class !== 'place').map(x => x.class)))
