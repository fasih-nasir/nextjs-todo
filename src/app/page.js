"use client"
import React, { useState, useEffect } from 'react';
// import "../app/style.css"
export default function StudentManagement() {
  var  [inp,setName]=useState("")
  var  [emai,setEmail]=useState("")
  var [gen,setGen]=useState("")
  var [male,setmale]=useState([]||"")
  var [female,setfemale]=useState([]||"")



  var [data,setdata]=useState(JSON.parse(localStorage.getItem("all")))
  
    
  
  // Male
  useEffect(() => {
    const uniqueMales = []; // Temporary array for unique males
    const uniqueFemales = []; // Temporary array for unique females
  
    data.forEach((e) => {
      if (e.gender === "male" && !uniqueMales.some(item => item.email === e.email)) {
        uniqueMales.push(e); // Only add unique male entries
      } else if (e.gender === "female" && !uniqueFemales.some(item => item.email === e.email)) {
        uniqueFemales.push(e); // Only add unique female entries
      }
    });
  
    // Set the state for both males and females once after processing
    setmale(uniqueMales);
    setfemale(uniqueFemales);
  }, [data]);
  console.log(female);

      // Male
  function fn(){

    var all=JSON.parse(localStorage.getItem("all")) || []   
var ob={
  name:inp,
  email:emai,
  gender:gen
}
all.push(ob)
    localStorage.setItem("all",JSON.stringify(all))
    setName("");
    setEmail("");
    setGen("");
 
  }
return(
  <>
  <div className='body flex flex-col align-middle'>
<div className='container  grid grid-cols-4 gap-2 my-2 box' >
  {/*  */}
<div className='py-2 px-2 flex lg:flex-row flex-col align-middle justify-center lg:justify-around lg:align-middle  border border-gray-800'>
  <span className='flex flex-row lg:items-center justify-center align-middle'>
  <i className="fa-solid fa-user-graduate"></i>
  </span>
  <span className='grid lg:grid-cols-3  lg:text-start text-center'>
    students <br/> {data ?(data.length):(0)} </span>
  

</div>
{/*  */}
<div className=' py-2 px-2 flex lg:flex-row flex-col align-middle justify-center lg:justify-around lg:align-middle  border border-gray-800'>
  <span  className=' flex flex-row lg:items-center justify-center align-middle'>
  <i className="fa-solid fa-clipboard-user "></i>
  </span>
  <span className='grid lg:grid-cols-3  lg:text-start text-center '>students <br/>{data ?(data.length):(0)}</span>
  
</div>
{/*  */}
<div className='py-2 px-2 flex lg:flex-row flex-col   justify-center lg:justify-around lg:align-middle  border border-gray-800'>
  <span className='flex flex-row lg:items-center justify-center align-middle'>
  <i className="fa-solid fa-person-dress"></i>
  </span>
<span className='grid lg:grid-cols-3  lg:text-start text-center '>
  female <br/> {female.length?(female.length):(0)}
  {/* {data.map((e,index)=>(console.log(e.gender === "female")))} */}
</span>
  

</div>
{/*  */}
<div className='py-2 px-2 flex lg:flex-row flex-col align-middle justify-center lg:justify-around lg:align-middle  border border-gray-800'>
  <span className='flex flex-row lg:items-center justify-center align-middle'>
  <i className="fa-solid fa-person"></i>
  </span>
  <span className='grid lg:grid-cols-3  lg:text-start text-center'>male <br/> {male.length} </span>
  
</div>

</div>
{/*  */}

  <div>
    <input placeholder='Enter your name'value={inp} onChange={(e)=>{setName(e.target.value)}}/>
    <input placeholder='Enter your email'value={emai} onChange={(e)=>{setEmail(e.target.value)}}/>
<select value={gen} onChange={(e)=>{setGen(e.target.value)}}>
<option value={""}>Select Gender</option>
  
  <option value={"female"}>Female</option>
  <option value={"male"}>Male</option>

</select>
    
    <button onClick={fn} className='btn '>Save </button>
  </div>
  {/*  */}
  <div>
   
  {data ? (
    data.map((e, index) => (
      <div className='flex flex-row justify-around w-72 border border-green-500' key={index}>
        <p>{e.name}</p>
        <p>{e.email}</p>
        <p>{e.gender}</p>
      </div>
    ))
  ):(
    <h1>user not found</h1>
  )}

</div>
  </div>
  </>
  )
}
