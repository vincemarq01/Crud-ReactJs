import React from 'react'

import {useEffect, useState} from 'react'
import { TextField, Button, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import AddList from './AddList';
import EditPost from './EditPost';

const TableList = () => {
    const [list, setList] = useState([]);
    const [listId, setListId] = useState();
    const [isOpen, setisOpen] = useState(true);
    const hideandGetid = (id) =>{
    setListId(id);
    setisOpen(false);
}
    useEffect(() => {
        async function fetchpostApi (){
        try {  
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const tableList = await response.json();
        setList(tableList);
        console.log(tableList);
        } catch (error) {
        }
        }
        fetchpostApi();
        },[])


const addList = async (title, body) => {

   const response =  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
    title,
    body,
    }),
    headers: {
    "Content-type": "application/json; charset=UTF-8"
    }
    })
    const data =  await response.json();
    setList((listitem) => [...listitem,data])
      };


  const deleteList = async (id) => {
        try {
        const response =  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method: 'DELETE',
          });
          setList((userlist) => userlist.filter((post) => post.id !== id));
        } catch (error) {
        console.error("ErrorDelete", error)
        }
      };


      const editList = async (listid, title, body, userid) => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${listid}`, {
            method: "PUT",
            body: JSON.stringify({
              id: listid,
              title: title,
              body: body,
              userId: userid
              }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
          const data = await response.json();
          console.log("Response data:", data);
         setList((editList) => editList.map((list) => list.id === listid ? { ...list, title: title, body: body } : list))
        
        } catch (error) {
          console.error("ErrorEdit", error)
        }
      };



  return (
    <div>
  
 
    {isOpen? <AddList addList={addList}  /> : <EditPost  listid={listId} editList={editList} isOpen={setisOpen}/>}


      <TableContainer component={Paper}  sx={{  maxWidth: 650, my:'auto', display:'flex', justifyContent: 'center', alignItems: 'center' }} >
     
      <Table aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Body</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((listitem) => (
            <TableRow
              key={listitem.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {listitem.title}
              </TableCell>
              <TableCell align="left">{listitem.body}</TableCell>
              <TableCell align='right'>
                <Button variant="contained" color="primary" onClick={() => hideandGetid(listitem.id)}> EDIT </Button>
              </TableCell>
              <TableCell align='right'>
                <Button variant="contained" color="error" onClick={() => deleteList(listitem.id)}>Delete </Button> 
              </TableCell>
            

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default TableList
