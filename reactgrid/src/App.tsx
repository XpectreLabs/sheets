import * as React from "react";
import { render } from "react-dom";
import { ReactGrid, Highlight, CellChange, Row, Column, Id, MenuOption, SelectionMode, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import './App.css';

interface Person {
  id: number;
  name: string;
  surname: string;
  birth: Date | undefined;
  mobile: number;
  company: string;
  occupation: string;
}

const getPeople = (): Person[] => [
  {
      id: 1,
      name: "Thomas",
      surname: "Goldman",
      birth: new Date("1970-12-02"),
      mobile: 574839457,
      company: "Snatia Ebereum",
      occupation: "CEO"
  },
  {
      id: 2,
      name: "Mathew Lawrence",
      surname: "Joshua",
      birth: new Date("1943-12-02"),
      mobile: 684739283,
      company: "De-Jaiz Mens Clothing",
      occupation: "Technical recruiter"
  },
  {
      id: 3,
      name: "Susie Evelyn",
      surname: "Spencer",
      birth: new Date("1976-01-23"),
      mobile: 684739283,
      company: "Harold Powell",
      occupation: "Concrete paving machine operator"
  },
  {
    id: NaN,
    name: "",
    surname: "",
    birth: undefined,
    mobile: NaN,
    company: "",
    occupation: ""
  }
];

interface ColumnMap {
  name: 'name';
  surname: 'surname';
  birth: 'birth',
  mobile: 'mobile',
  company: "company",
  occupation: "ocuupation"
}

const columnMap: ColumnMap = {
  name: 'name',
  surname: 'surname',
  birth: 'birth',
  mobile: 'mobile',
  company: "company",
  occupation: "ocuupation"
};

type ColumnId = keyof ColumnMap;

const getColumns = (): Column[] => [
  { columnId: "name", width: 150, resizable: true },
  { columnId: "surname", width: 100, resizable: true },
  { columnId: "birth", width: 100, resizable: true },
  { columnId: "mobile", width: 100, resizable: true },
  { columnId: "company", width: 190, resizable: true },
  { columnId: "occupation", width: 300, resizable: true }
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
    { type: "header", text: "Birth" },
    { type: "header", text: "Mobile" },
    { type: "header", text: "Company" },
    { type: "header", text: "Occupation" },
  ]
};

const getRows = (people: Person[], columnsOrder: ColumnId[]): Row[] => {
  return [
    {
      rowId: "header",
      cells: [
        { type: "header", text: "name" },
        { type: "header", text: "surname" },
        { type: "header", text: "birth" },
        { type: "header", text: "phone" },
        { type: "header", text: "company" },
        { type: "header", text: "occupation" }
      ]
    },
    ...people.map<Row>((person, idx) => ({
      rowId: person.id,
      reorderable: true,
      cells: [
        { type: "text", text: person.name }, // `person['name']` / `person['surname']`
        { type: "text", text: person.surname }, // `person['surname']` / `person['name']`
        { type: "date", date: person.birth }, // `person['surname']` / `person['name']`
        { type: "number", value: person.mobile }, // `person['surname']` / `person['name']`
        { type: "text", text: person.company }, // `person['surname']` / `person['name']`
        { type: "text", text: person.occupation }, // `person['surname']` / `person['name']`
      ]
    }))
  ]
};

const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
  const movedElements = arr.filter((_, idx) => idxs.includes(idx));
  const targetIdx = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
  const leftSide = arr.filter((_, idx) => idx < targetIdx && !idxs.includes(idx));
  const rightSide = arr.filter((_, idx) => idx >= targetIdx && !idxs.includes(idx));
  return [...leftSide, ...movedElements, ...rightSide];
}

const applyChangesToPeople = (
  changes: CellChange<TextCell>[],
  prevPeople: Person[]
): Person[] => {
  changes.forEach((change) => {
    const personIndex = change.rowId;
    const fieldName = change.columnId;
    prevPeople[personIndex][fieldName] = change.newCell.text;
  });
  return [...prevPeople];
};

function App() {
  const [people, setPeople] = React.useState<Person[]>(getPeople());
  const [columns, setColumns] = React.useState<Column[]>(getColumns());
  const rows = getRows(people, columns.map(c => c.columnId as ColumnId));

  const handleChanges = (changes: CellChange<TextCell>[]) => {
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  const handleColumnResize = (ci: Id, width: number) => {
    setColumns((prevColumns) => {
        const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
        const resizedColumn = prevColumns[columnIndex];
        const updatedColumn = { ...resizedColumn, width };
        prevColumns[columnIndex] = updatedColumn;
        return [...prevColumns];
    });
  }

  const handleColumnsReorder = (targetColumnId: Id, columnIds: Id[]) => {
    const to = columns.findIndex((column) => column.columnId === targetColumnId);
    const columnIdxs = columnIds.map((columnId) => columns.findIndex((c) => c.columnId === columnId));
    setColumns(prevColumns => reorderArray(prevColumns, columnIdxs, to));
  }

  const handleRowsReorder = (targetRowId: Id, rowIds: Id[]) => {
    setPeople((prevPeople) => {
        const to = people.findIndex(person => person.id === targetRowId);
        const rowsIds = rowIds.map((id) => people.findIndex(person => person.id === id));
        return reorderArray(prevPeople, rowsIds, to);
    });
  }

  const simpleHandleContextMenu = (
      selectedRowIds: Id[],
      selectedColIds: Id[],
      selectionMode: SelectionMode,
      menuOptions: MenuOption[]
    ): MenuOption[] => {
    return menuOptions;
  }

  const highlights: Highlight[] = [
    { columnId: "name", rowId: 1, borderColor: "#00ff00" },
    { columnId: "surname", rowId: 2, borderColor: "#0000ff" },
    { columnId: "name", rowId: 3, borderColor: "#ff0000" }
  ];

  return (
      <ReactGrid
        rows={rows}
        onColumnsReordered={handleColumnsReorder}
        onRowsReordered={handleRowsReorder}
        enableRowSelection
        enableColumnSelection
        enableFillHandle
        enableRangeSelection
        enableGroupIdRender
        columns={columns}
        stickyLeftColumns={1}
        stickyRightColumns={1}
        stickyTopRows={1}
        stickyBottomRows={1}
        onColumnResized={handleColumnResize}
        onContextMenu={simpleHandleContextMenu}
        highlights={highlights}
        initialFocusLocation={{ columnId: 'name', rowId: 'row-3' }}
        onCellsChanged={handleChanges}
      />
    );
}

render(<App />, document.getElementById("root"));

export default App;
