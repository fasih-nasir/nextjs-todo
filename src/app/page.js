"use client";
import React, { useState, useEffect } from 'react';

export default function StudentManagement() {
  const [inp, setName] = useState("");
  const [emai, setEmail] = useState("");
  const [gen, setGen] = useState("");
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const [data, setData] = useState(() => {
    // Initialize state with localStorage data if available
    return JSON.parse(localStorage.getItem("all")) || [];
  });

  // Effect to filter unique males and females when data changes
  useEffect(() => {
    const uniqueMales = [];
    const uniqueFemales = [];

    data.forEach((e) => {
      if (e.gender === "male" && !uniqueMales.some(item => item.email === e.email)) {
        uniqueMales.push(e);
      } else if (e.gender === "female" && !uniqueFemales.some(item => item.email === e.email)) {
        uniqueFemales.push(e);
      }
    });

    setMale(uniqueMales);
    setFemale(uniqueFemales);
  }, [data]);

  // Function to handle saving a new student
  const fn = () => {
    const ob = {
      name: inp,
      email: emai,
      gender: gen
    };

    const updatedData = [...data, ob]; // Create a new array including the new student
    localStorage.setItem("all", JSON.stringify(updatedData));
    setData(updatedData); // Update state to re-render with new data
    setName("");
    setEmail("");
    setGen("");
  };

  return (
    <>
      <div className='body flex flex-col align-middle'>
        <div className='container grid grid-cols-4 gap-2 my-2 box'>
          {/* Student Count */}
          <div className='py-2 px-2 flex lg:flex-row flex-col align-middle justify-center lg:justify-around lg:align-middle border border-gray-800'>
            <span className='flex flex-row lg:items-center justify-center align-middle'>
              <i className="fa-solid fa-user-graduate"></i>
            </span>
            <span className='grid lg:grid-cols-3 lg:text-start text-center'>
              Total Students <br /> {data.length}
            </span>
          </div>

          {/* Female Count */}
          <div className='py-2 px-2 flex lg:flex-row flex-col align-middle justify-center lg:justify-around lg:align-middle border border-gray-800'>
            <span className='flex flex-row lg:items-center justify-center align-middle'>
              <i className="fa-solid fa-person-dress"></i>
            </span>
            <span className='grid lg:grid-cols-3 lg:text-start text-center'>
              Female <br /> {female.length}
            </span>
          </div>

          {/* Male Count */}
          <div className='py-2 px-2 flex lg:flex-row flex-col align-middle justify-center lg:justify-around lg:align-middle border border-gray-800'>
            <span className='flex flex-row lg:items-center justify-center align-middle'>
              <i className="fa-solid fa-person"></i>
            </span>
            <span className='grid lg:grid-cols-3 lg:text-start text-center'>
              Male <br /> {male.length}
            </span>
          </div>
        </div>

        {/* Input Fields */}
        <div>
          <input placeholder='Enter your name' value={inp} onChange={(e) => { setName(e.target.value) }} />
          <input placeholder='Enter your email' value={emai} onChange={(e) => { setEmail(e.target.value) }} />
          <select value={gen} onChange={(e) => { setGen(e.target.value) }}>
            <option value={""}>Select Gender</option>
            <option value={"female"}>Female</option>
            <option value={"male"}>Male</option>
          </select>
          <button onClick={fn} className='btn'>Save</button>
        </div>

        {/* Display Students */}
        <div>
          {data.length > 0 ? (
            data.map((e, index) => (
              <div className='flex flex-row justify-around w-72 border border-green-500' key={index}>
                <p>{e.name}</p>
                <p>{e.email}</p>
                <p>{e.gender}</p>
              </div>
            ))
          ) : (
            <h1>User not found</h1>
          )}
        </div>
      </div>
    </>
  );
}
