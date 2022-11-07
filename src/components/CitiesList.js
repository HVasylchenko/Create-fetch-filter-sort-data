import React from "react";

const CitiesList = ({cities, onSelectCity}) => {
  return (
    <ul>
      {cities.map((city, index) => (
        <li key={city.name} onClick={()=>onSelectCity(index)}>
          {city.name} ({city.description})
        </li>
      ))}
    </ul>
  );
};

export default CitiesList;
