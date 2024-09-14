import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

const FormOutput = () => {

    const [list,setList] = useState([]);
    useEffect(()=>{
        setList(JSON.parse(localStorage.getItem('list')) || []);
    },[])

    return (
    <div>
       <Table striped bordered hover size="sm" variant='dark'>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Reference</th>
                    <th>Review</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((val,index)=>{
                    return(
                    <tr key={index} >
                        <td>{val.firstName}</td>
                        <td>{val.lastName}</td>
                        <td>{val.email}</td>
                        <td>{val.phone}</td>
                        <td>{val.refrence}</td>
                        <td>{val.review}</td>
                    </tr>
                    )
                    })
                }
            </tbody>    
        </Table>  
    </div>
  )
}

export default FormOutput
