import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'

const SessionStorage = () => {
  
  const [studnt,setStudnt] = useState({})  
  const [list,setList] = useState([])  
  const [err,setErr] = useState({})

  useEffect(()=>{
    let oldVal = JSON.parse(sessionStorage.getItem('list')) || []
    setList(oldVal)
  },[])

  function handleInput(val){        
    let {name,value} = val.target;
    setStudnt({...studnt,[name]:value}) 
  }

  function handleValidation(){
   let tempError = {};
   if(!studnt.userName) tempError.userName = "User Name required"
   if(!studnt.email) tempError.email = "email required"
   else if(!/\S+@\S+\.\S+/.test(studnt.email)) tempError.email = "Invalid Email"
   setErr(tempError)
   return Object.keys(tempError).length != 0 
  }

  function submtForm(){
    if (handleValidation()) return;
    let newVal = [...list,studnt]
    setList(newVal)      
    sessionStorage.setItem('list', JSON.stringify(newVal))
    setStudnt({})  
    setErr({}) 
  }

  return (
    <div>
      <Container className='py-4'>
            <div className='row mb-4 justify-content-around' >
                <div className='col-4' >
                  <div className="form-container">
                    <form className="form border rounded-3 px-3 py-2" onSubmit={(e)=>{e.preventDefault()}}>
                      <h3>User Form</h3>
                      <div className="form-group" style={{gap:"10px"}} >
                        <input type="text" name='userName' placeholder='enter name' className='form-control' value={studnt.userName?studnt.userName:""} onChange={handleInput}  />{err.userName? <label>{err.userName}</label>:null }
                        <input type="text" name='email' placeholder='enter email' className='form-control mt-4' value={studnt.email?studnt.email:""} onChange={handleInput}  />{err.email? <label>{err.email}</label>:null }
                     </div>  
                      <div className="form-group mt-3">  
                        <button className='btn btn-success' type='submit' onClick={submtForm} >Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-5'>
                  <Table striped bordered hover size="sm" variant='dark'>
                    <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          list.map((val,index)=>{
                            return(
                            <tr key={index} >
                              <td>{val.userName}</td>
                              <td>{val.email}</td>
                            </tr>
                            )
                          })
                        }
                    </tbody>    
                  </Table>  
                </div>
            </div>
        </Container>
    </div>
  )
}

export default SessionStorage
