import React, { useEffect, useState } from 'react';
import style from './style.dataList.module.css'

function DataList() {
  const [dataList, setDataList] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => {
        setDataList(data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [dataList]);

  return (
    <div >
      {dataList.map((item, index) => (
        <div key={index} className={style.mainInfoData}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <img className={style.imgData}src={`http://localhost:3000/${item.imagePath}`} alt={item.name} />
        </div>
      ))}
    </div>
  );
}

export default DataList;
