import './App.css';
import React, { useEffect, useState } from 'react';
import Tree from './Tree/Tree';

function App() {

  const [data,setData] = useState({});
  const [categories,setCategories] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState('default');

  useEffect(async () => {
    try{
      const dataFromBackend = await fetch('https://okrcentral.github.io/sample-okrs/db.json');
      const deSerializedContent = await dataFromBackend.json();
      let tempData = {};
      let tempCategories = new Set();
      deSerializedContent.data.forEach(item => {
        tempCategories.add(item.category);
        if(item.parent_objective_id.length === 0) tempData[item.id] = {
          children:[],
          item:item
        };
        else if(item.parent_objective_id.length > 0){
          if(tempData[item.parent_objective_id]) {
            tempData[item.parent_objective_id]['children'] = [...tempData[item.parent_objective_id]['children'],item]
          } else {
            tempData[item.parent_objective_id] = {
              children:[],
              item:item
            }
          }
        } ;
      });
     setData(tempData);
     setCategories(Array.from(tempCategories));
    }
    catch(r){
      console.log(r)
    }},[]);
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ally Assignment</h1>
        <div>
          <label htmlFor='categories'>Filter</label>
          <select id='categories' onChange={e =>setSelectedCategory(e.target.value)}>
            <option value='default'>Select Filter</option>
            {
              categories.length > 0 && categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
                )
              )
            }
          </select>
        </div>

        { Object.keys(data).length > 0 && 
          Object.keys(data).map(dataItem =>
            <React.Fragment key={dataItem.id}>
              <Tree selectedCategory={selectedCategory} item={data[dataItem].item} children={data[dataItem].children}/>
            </React.Fragment>
          )
        }
      </header>
    </div>
  );
}

export default App;
