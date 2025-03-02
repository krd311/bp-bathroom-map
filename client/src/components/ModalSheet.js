import React, { useState, useEffect } from 'react';
import './ModalSheet.css';
import Sheet from 'react-modal-sheet';
<<<<<<< HEAD
import Axios from 'axios';
import Fuse from 'fuse.js';
import SearchCard from './SearchCard.js';

const ModalSheet = ({ lat, lng}) => {
=======
import search_icon from "../assets/search_icon.png";

const ModalSheet = (props) => {
>>>>>>> main
  const [isOpen, setOpen] = useState(false);

  const options= { distance:20, findAllMatches:true, limit:10 };
  const [fuse, setFuse] = useState();
  const [bathroomResults, setBathroomResults] = useState([]);
  const [bathroomsList, setBathroomsList] = useState([]);
  const [bathroomsJSON, setBathroomsJSON] = useState({});

  const getBathroomNames = async () => {
    const res = await Axios.get("http://localhost:3001/bathrooms");
    const bathroomNames = res.data.map((bathroom) => bathroom.name);
    setBathroomsList(bathroomNames);
    setBathroomsJSON(res.data);
    setFuse(new Fuse(bathroomNames,options));
  }

  useEffect(async () => {
    await getBathroomNames();
  }, [])

  const rad = (x) => {
    return x * Math.PI / 180;
  }

  const R = 6371; // radius of earth in km
  const calcDist = (location) => {
    const mlat = location.lat;
    const mlng = location.lng;
    var dLat = rad(mlat - lat);
    var dLong = rad(mlng - lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const calcRating = (breviews) => {
    const length = breviews?.length;
    if (!length) {
      return NaN;
    }
    const reviews = breviews.map((e) => e.rating);
    const avg_rating = (length===0 ? NaN : reviews.reduce(reducer) / length).toFixed(1);
    return avg_rating
  }


  const changeHandler = (e) => {
    const val = e.target.value;
    event.preventDefault(); //prevent default behavior
    let similarBathrooms= fuse.search(val);
    similarBathrooms.sort((a,b) => (
      calcDist(bathroomsList[a]) - calcDist(bathroomsList[b]) ///closest distances
      +  calcRating(bathroomsList[b].reviews) - calcRating(bathroomsList[a].reviews))); //highest reviews
    // console.log(similarBathrooms);
    setBathroomResults(similarBathrooms);
  }

  const createCard = (idx) => {
    const bathroom = bathroomsJSON.filter((data) => data.name===bathroomsList[idx])[0]

    const reducer = (acc, curr) => acc + curr;
    const length = bathroom.reviews.length;
    const reviews = bathroom.reviews.map((e) => e.rating);
    const avg_rating = (length===0 ? NaN : reviews.reduce(reducer) / length).toFixed(1);
    console.log(avg_rating);

    return (
      <SearchCard
        key={bathroom._id}
        name={bathroom.name}
        rating = {avg_rating}
        img={bathroom.img}
      />
    )
  }

  return (
    <div className='search'>
      <div className="search-wrapper">
        {/* <i className="bi bi-search search-icon"></i> */}
        <img src={search_icon} className='search-image'></img>
        <input
          className="search-bar-btn"
          onClick={() => setOpen(true)}
          placeholder="Search Bathrooms"
        />
      </div>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
<<<<<<< HEAD
            <div className="modal-body">
              <div className="search-header">
                <div className="search-wrapper">
                  <i className="bi bi-search search-icon"></i>
                  <input
                    className="search-bar-btn"
                    placeholder="Search Bathrooms"
                    onChange={changeHandler}
                    autoFocus
                  ></input>
                </div>

                <div className="button-wrapper">
                  <button className="cancel-button" onClick={() => setOpen(false)}>Cancel</button>
                </div>
              </div>

              <div>
                {
                  bathroomResults.map((idx) => createCard(idx))
                }
=======
            <div class="modal-body">
              <div className="search-wrapper">
                <img src={search_icon} className='search-image'></img>
                {/* <i className="bi bi-search search-icon"></i> */}
                <input
                  className="search-bar-btn"
                  placeholder="Search Bathrooms"
                  value={searchValue}
                  onChange={changeHandler}
                  autoFocus
                ></input>
>>>>>>> main
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default ModalSheet;
