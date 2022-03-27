import './PhotoResult.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import React from "react";
export function PhotoResult(){
  const params=useParams();
  let [urls,seturls]=useState([]);//urls of the images
  let [err,seterr]=useState("");// error message
  let [count,setcount]=useState(0);//page number
  let [sixurls,setsixurls]=useState([]);//getting pack of 6 urls as I am showing 6 images in 1 Page.
  let [loading,setloading]=useState(true);//for checking if the data has fetched yet or not
  useEffect(()=>{getData();console.log(loading);},[]);//for first render
  useEffect(()=>{getData();set6urls();},[params.keyword]);
  useEffect(()=>{set6urls();},[urls]);
  useEffect(()=>{set6urls(); console.log(count);},[count]);
  //For Fetching images from UnSplash API
  const getData=async ()=>{
      console.log(loading);
      
      if(params.keyword==="")
        {console.log("No keyword");}
      else{
          console.log(params.keyword);
      const u=await axios.get("https://api.unsplash.com/search/photos?",{
           params:{query:params.keyword,per_page:30},
           headers:{
               Authorization:`Client-ID wKYJC-RdOi0aH2tIZ2NUCK_l4sTgjs3G1ZS2tGBBqO4`,    
           }
      }).then((output)=>{
      if(output.status===200){
        
        seturls(output.data.results);
        if(output.data.results.length>0){
          setcount(()=>{return 1});
        }
        
      }else if(output.status===404){
        seterr("Images not found");
      } else if(output.status===500||output.status===503){
        seterr("Something went wrong from Unsplash")
      }
      }).catch((err)=>{seterr(err.message)});
      setloading(false);
      }
     }
     //For incrementing Page Number
    const increment=()=>{
      if(count<Math.ceil(urls.length/6))
      setcount(()=>{return count+1})
    }
    //For Decrementing Page Number
    const decrement=()=>{
      if(count>1){
      setcount(()=>{return count-1});
      }
    }
    //for finding number of pages which will contain 6 images
    const findpageswith6images=()=>{
      let leng=urls.length;
      let fullpage=0;
      if(urls.length%6===0){
      fullpage=(leng/6);
      
      }
      else {
          console.log(leng);
          let remainder=leng%6;
          fullpage=(leng-remainder)/6;}
          return fullpage;
  }
  //for creating array of six urls on each updation of page number
  const return6urls=(start,end)=>{
    let url=[];
    for(let pos=start;pos<=end;pos++){
        url.push(urls[pos]);
    }
    return url;
  }//for updating sixurls state with the urls value depending on the page number
    const set6urls=()=>{
      let fullpage=findpageswith6images();
        let url=[];
        for(let i=1;i<=Math.ceil(urls.length/6);i++){
            if(count===i){
                if(count<=fullpage){
                url=return6urls((count-1)*6,(count-1)*6+5);
                }else{
                    
                    url=return6urls((count-1)*6,urls.length-1);
                }
            
        }}
        
      setsixurls(url);
    }

//rendering of data depending on different scenerio.
    if(params.keyword===""){
      return(<h2>Please provide a keyword</h2>)
    }
    else if(err!==""){
      return (<h2>{err}</h2>)
    }
    else if(loading===true){
        return <h2>Loading DATA</h2>
      }else if(urls.length===0){
        return (<h2>No Images Found FOR {params.keyword.toUpperCase()} keyword</h2>)
      }
      else return(
      
        <div className='container-fluid'id="photodiv">
          <h2>{params.keyword.toUpperCase()} IMAGES</h2>
          {sixurls.map((image)=>{ return (<LazyLoadImage  id={"image"+sixurls.indexOf(image)} className='img-thumbnail'  effect="black-and-white" key={image.id} src={image.urls.small} alt={image.alt_description}  />) })}
         <div className='container-fluid' id="pagination">
         <button onClick={decrement} className="btn btn-secondary" disabled={count===1}>Prev</button>&nbsp;
          PAGE {count} of {Math.ceil(urls.length/6)}&nbsp;
         <button onClick={increment} className="btn btn-secondary" disabled={count===Math.ceil(urls.length/6)}>Next</button>
         </div>
        </div>
    )
}