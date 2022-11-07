import React from "react";

const City = ({city, onChangeCity}) => {
 
  return (
    <div>
      <h3>{city.name}</h3>
      <textarea
        value={city.description}
        onChange={e => onChangeCity(e.target.value)}
      ></textarea>
    </div>
  );
};

export default City;
