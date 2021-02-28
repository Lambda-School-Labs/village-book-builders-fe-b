import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import FormImput from '../../common/FormInput';
import axios from 'axios';

const FilterSessionsByLibrary = () => {
  const [libId, setId] = useState(0);
  const [Sessions, setSessions] = useState([]);
  
  // useEffect((libId)=>{
  //   fetchSessions(libId);
  // },[]);

  const handleSubmit = event => {
    event.preventDefault();
    axios
    .get(`http://localhost:5000/users/${libId}`)
    .then(res => setSessions(res.data))
    .catch(err => console.log(err.response));
};
  

  const handleChange = event => {
    setId(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
       <label>Library id</label>
       <FormImput
        type="text"
        placeholder='library id'
        name="libray_id"
        pattern="[0-9]*"
        onChange={handleChange}
      />
      <input className="input-form"
                        type="text" name="name"
                        placeholder="NAME"
                        value={user.name}
                        onChange={handleChange} />

       <Button type="submit">Submit</Button>
       </form>
       <div>
         <small>session information goes here</small>
       </div>
     </div>
  );
};

export default FilterSessionsByLibrary;
