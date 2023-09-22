import './App.css';

import Spreadsheet from "react-spreadsheet";

const App = () => {
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "" }],
    [{ value: "Strawberry" }, { value: "Cookies" }, { value: "" }],
  ]);
  return <Spreadsheet data={data}
  onChange={
     t = data.map(row => {...row});
    for (let i = 0; i < 3; i++) {
      const string = d[i][1]
      if(string.value === 'Chocolate'){
        t[i][2] = {value:"🍫"}
      }
      else if(string.value === "Cookies"){
        t[i][2] = {value:"🍪"}
      }
      else if(string.value === "Pizza"){
        t[i][2] = {value:"🍕"}
      }
      else {
        t[i][2] = {value:"❓"}
      }
    }
    setData(t)
  } />;
};

export default App;
