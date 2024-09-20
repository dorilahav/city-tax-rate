import { CustomCellRendererProps } from 'ag-grid-react';
import { CityData, Mark } from '../../types';

const MarkButton = ({rowValue, targetValue, onValueSet}: {rowValue: Mark, targetValue: Mark, onValueSet: (value: Mark) => void}) => {
  if (rowValue === targetValue) {
    return null;
  }

  return (
    <button onClick={() => onValueSet(targetValue)}>
      {Mark[targetValue]}
    </button>
  )
}

export const MarkCityButtons = (props: CustomCellRendererProps<CityData, Mark>) => {
  const setRowValue = (targetValue: Mark) => {
    props.setValue?.(targetValue)
  }

  return (
    <div>
      <MarkButton rowValue={props.value!} targetValue={Mark.Irrelevant} onValueSet={setRowValue}/>
      <MarkButton rowValue={props.value!} targetValue={Mark.Relevant} onValueSet={setRowValue}/>
      <MarkButton rowValue={props.value!} targetValue={Mark.Favorite} onValueSet={setRowValue}/>
    </div>
  )
}