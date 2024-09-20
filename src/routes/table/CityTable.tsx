import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { CityData, Mark } from '../../types';
import { MarkCityButtons } from './MarkCityButtons';

const columns: ColDef<CityData>[] = [
  {
    field: 'number'
  },
  {
    field: 'name'
  },
  {
    field: 'points'
  },
  {
    field: 'taxReturnRate'
  },
  {
    field: 'maxSalaryAmount'
  },
  {
    field: 'mark',
    cellRenderer: MarkCityButtons,
    cellRendererParams: {}
  }
]

function CityTable({cities}: {cities: CityData[]}) {
  const [searchText, setSearchText] = useState('');
  // const [cities, setCities] = useState<CityData[]>(data);

  const relevantCities = useMemo(() => cities.filter(x => x.mark !== Mark.Irrelevant), [cities]);
  const searchedRelevantCities = useMemo(() => relevantCities.filter(x => x.name.includes(searchText)), [relevantCities, searchText]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(cities, null, 2));
  }
  
  return (
    <div style={{height: '100vh', width: '100vw', overflow: 'auto', display: 'flex', flexDirection: 'column'}} className="ag-theme-quartz">
      <input value={searchText} onChange={e => setSearchText(e.target.value)}></input>
      <div style={{flex: 1}}>
        <AgGridReact
          columnDefs={columns}
          rowData={searchedRelevantCities}
        />
      </div>
      <button onClick={copyToClipboard}>Copy</button>
    </div>
  )
}

export default CityTable;