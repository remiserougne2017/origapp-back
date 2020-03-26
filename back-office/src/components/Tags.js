import React, {useState } from 'react';
import '../App.css';
import {Tag} from 'antd';

const HotTags= () => {

const { CheckableTag } = Tag;
const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];


const [selectedTags, setSelectedTags] =useState([])
const [nextSelectedTags, setNextSelectedTags]= useState(tagsFromServer)

const handleChange= (tag, checked)=> {
setSelectedTags([...selectedTags,tag])
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
   setSelectedTags(nextSelectedTags);
  }

    return (
      <div>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }

  export default HotTags