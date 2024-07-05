
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
const EditPost = ({listid, editList, isOpen}) => {
    const [list, setList] = useState([]);


    useEffect(() => {
        async function fetchpostApi (){
        try {  
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${listid}`);
        const tableList = await response.json();
        setList(tableList);
        console.log(tableList);
        } catch (error) {
        }
        }
        fetchpostApi();
        },[listid])

        const handleOnEditSubmit = (evt) => {
            evt.preventDefault();
            editList(listid, evt.target.title.value, evt.target.body.value);
            isOpen(true);
            // setIsEdit(!isEdit);
          };

          const cancelEdit = () => {
            isOpen(true);
         
          };

  return (
    <div>  
     <Box component="form" onSubmit={handleOnEditSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 ,mt:5}}>
    <TextField
      label="Title"
      name='title'
      defaultValue={list.title}

      multiline
      required
    />
    <TextField
      label="Body"
      name='body'
      defaultValue={list.body}
    // onChange={(e) => setTitle(e.target.value)}
      multiline
      rows={4}
      required
    />
     <Button type="submit" variant="contained" color="primary">EDIT POST</Button>
     <Button type="submit" variant="contained" color="primary" onClick={cancelEdit}>CANCEL</Button>
  </Box>

</div>
  )
}

export default EditPost