import React, {useState, useEffect } from 'react';
import '../App.css';
import {Tag} from 'antd';


const HotTags= (props) => {

const { CheckableTag } = Tag;
// const  tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];
const [tagsFromServer,setTagFromServer]=useState([{_id:"5e5f6b2ce3d9713cb8410b87","name":"Jeunesse"},
{_id:"5e5f6b2ce3d9713cb8410b88","name":"Histoire"},
{_id: "5e5f6b2ce3d9713cb8410b89","name":"Affiche"},
{_id: "5e5f6b2ce3d9713cb8410b8a","name":"Livre"},
{_id: "5e5f6b2ce3d9713cb8410b8c","name":"BD"},
{_id: "5e5f6b2ce3d9713cb8410b8b","name":"Comics"}])


const [selectedTags, setSelectedTags] =useState([])
const [nextSelectedTags, setNextSelectedTags]= useState(tagsFromServer)
console.log("SELECTED TAGS",props.selectedTags)
useEffect(()=>{
  // const getTag = async () => {
  //   var tags = await fetch(`/bo/tags`);
  //   console.log('FETCH TAGS', await tags);
  //   let tagJson = await tags.json();

  //   setTagFromServer(tagJson);
  // }
  // getTag()
  if(props.selectedTags){
    setSelectedTags(props.selectedTags)
  }
},[])

useEffect(()=>{
  props.tagsBook(selectedTags)
  
},[selectedTags])

const handleChange= (tag, checked)=> {

setSelectedTags([...selectedTags,tag])
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t._id !== tag._id);
    console.log('You are interested in: ', nextSelectedTags);
   setSelectedTags(nextSelectedTags);

  }

    return (
      <div>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag.name}
            checked={selectedTags.findIndex(t=>t._id==tag._id) > -1}
            onChange={checked => handleChange(tag, checked)}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </div>
    );
  }

  export default HotTags