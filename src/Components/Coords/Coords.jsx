import { useState, useEffect } from 'react';
import './Coords.css';

const Coords = () => {
  const [coords, setCoords] = useState({
    latA: 0,
    longA: 0,
    latB: 0,
    longB: 0
  });
  // const [coordsChanged, setCoordsChanged] = useState(false);

  const [calculatedDist, setCalculatedDist] = useState(0)

  const haversine = (la1, lo1, la2, lo2) => {
    /*
    Haversine formula in classical math terminology
      a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
      c = 2 ⋅ atan2( √a, √(1−a) )
      d = R ⋅ c                        <<< distance
    */

   //radians
   const lat1 = parseInt(la1) * Math.PI/180;
   const lat2 = parseInt(la2) * Math.PI/180;
   const diffInLat = (la2 - la1) * Math.PI/180;
   const diffInLong = (lo2 - lo1) * Math.PI/180;

  const a = Math.sin(diffInLat/2) * Math.sin(diffInLat/2)
          + (Math.cos(lat1) * Math.cos(lat2)
          * (Math.sin(diffInLong/2) * Math.sin(diffInLong/2)));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (`${Math.round(6371 * c * 100) / 100} km`);
  }

  const handleCoordsChange = (e) => {
    const input = e.target.value;
    const field = e.target.name;
    setCoords({...coords, [field]: input});
  }

  const handleClick = (e) => {
    e.preventDefault();
    setCalculatedDist(haversine(coords.latA, coords.longA, coords.latB, coords.longB));
  }


  return (
    <form id="main_form">
      <div className="point">
        <p>Point A:</p>
        <div className="coord_pair_label">
          <div><small>Latitude A: </small></div>
          <input
            type="number"
            min="-90"
            max="90"
            step=".000001"
            value={coords.latA}
            name="latA"
            onChange={handleCoordsChange}
          />
        </div>
        <div className="coord_pair_label">
          <div><small>Longitude A: </small></div>
          <input
            type="number"
            min="-180"
            max="180"
            step=".000001"
            value={coords.longA}
            name="longA"
            onChange={handleCoordsChange}
          />
        </div>
      </div>
      <div className="point">
        <p>Point B:</p>
        <div className="coord_pair_label">
          <div><small>Latitude B: </small></div>
          <input
            type="number"
            min="-90"
            max="90"
            step=".000001"
            value={coords.latB}
            name="latB"
            onChange={handleCoordsChange}
          />
        </div>
        <div className="coord_pair_label">
          <div><small>Longitude B: </small></div>
          <input
            type="number"
            min="-180"
            max="180"
            step=".000001"
            value={coords.longB}
            name="longB"
            onChange={handleCoordsChange}
          />
        </div>
      </div>
      <button onClick={handleClick}>Measure Distance</button>
      <div>
        <div className="coord_pair_label">
          <small>Distance: </small>
          <input
            type="text"
            name="distance"
            value={calculatedDist}
            readOnly
          />
        </div>
      </div>
    </form>
  )
}

export default Coords;