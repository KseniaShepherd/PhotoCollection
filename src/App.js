import React, { useEffect, useState } from "react";
import { Collection } from "./components/Collection";
import "./index.scss";

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];
function App() {
  const [categoryId, setCategoryId] =useState(0);
  const [isLouding, setIsLouding] =useState(true);
  const[searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const[collections, setCollections] = useState([]);
  const category = categoryId ? `category=${categoryId}` : '';
  useEffect(()=>{
    setIsLouding(true)
    fetch(`https://64eeda54219b3e2873c38b94.mockapi.io/photoCollection?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      }).finally(()=> setIsLouding(false));
    }, [categoryId, page]);
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
         {cats.map((obj, index)=> <li onClick={()=>setCategoryId(index)} className={categoryId === index ? 'active' : ''} key = {obj.name}>{obj.name}</li>)}
        </ul>
        <input value= {searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLouding ? (<h2>Идет загрузка...</h2>) :(collections.filter((obj)=>{
          return obj.name.toLowerCase().includes(searchValue.toLowerCase())
        })
        .map((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos} />
        )))}
        
      </div>
      <ul className="pagination">
       {[...Array(3)].map((_, i)=> (
        <li 
        onClick={()=> setPage(i+1)} className={page === (i+1) ? 'active' : ''}>{i+1}</li>
       ))}
      </ul>
    </div>
  );
}

export default App;

