import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap"

const Input = (prop) => {
  const [inptFields,setFields] = useState({})
  useEffect(()=>{
    setFields(prop.type)
  },[])
  return (
    <>
      {
       inptFields.type == "refrence"?
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>{inptFields.title}</Form.Label>
        <Form.Select name={inptFields.type} onChange={prop.inptFun} value={prop.userObj[inptFields.type] || ''}>
          <option value="" disabled >Select an option</option>
          <option value="Internet Search">Internet Search</option>
          <option value="Friend">Friend</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>:
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='fw-bold'>{inptFields.title}</Form.Label> <br />
        <Form.Control type="text" name={inptFields.type} placeholder={inptFields.placeHold} onChange={prop.inptFun} value={prop.userObj[inptFields.type] || ''} />
      </Form.Group>
      }  
    </>
  )
}

export default Input
