
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddList = ({addList}) => {
      const [title, setTitle] = useState('')
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        addList(evt.target.title.value, evt.target.body.value);
        evt.target.title.value = "";
        evt.target.body.value = "";
      };

       
  return (
    <div>
    <Box component="form" onSubmit={handleOnSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 ,mt:5}}>
   <TextField
     label="Title"
     name='title'
     required
   />
   <TextField
     label="Body"
     name='body'
    //  value={list.body}
    //  onChange={(e) => setTitle(e.target.value)}
     multiline
     rows={4}
     required
   />
   <Button type="submit" variant="contained" color="primary">Add Post</Button>
  
 </Box>
 
 </div>
  )
}

export default AddList
