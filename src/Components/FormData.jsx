import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { BsEmojiAngry, BsEmojiLaughing, BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile } from "react-icons/bs";
import Input from './Input'

const FormData = () => {

  useEffect(()=>{
    let oldVal = JSON.parse(localStorage.getItem('list')) || [];
    setList(oldVal)
  },[])

  const [userObj, setUserObj] = useState({})
  const [list, setList] = useState([])

  const formType = [
    { type: "firstName", title: "First Name", placeHold: "Enter your first name" },
    { type: "lastName", title: "Last Name", placeHold: "Enter your last name" },
    { type: "email", title: "Email Address", placeHold: "Enter your email" },
    { type: "phone", title: "Phone Number", placeHold: "Enter your phone" },
    { type: "refrence", title: "How did you hear about us" },
  ];

  const iconArr = [
    { id: 0, ico: BsEmojiAngry, hoverColor: "red", defaultColor: "gray",msg:"very poor"},
    { id: 1, ico: BsEmojiFrown, hoverColor: "orange", defaultColor: "gray",msg:"poor" },
    { id: 2, ico: BsEmojiNeutral, hoverColor: "yellow", defaultColor: "gray",msg:"good" },
    { id: 3, ico: BsEmojiSmile, hoverColor: "lightgreen", defaultColor: "gray",msg:"very good" },
    { id: 4, ico: BsEmojiLaughing, hoverColor: "green", defaultColor: "gray",msg:"excellent" },
  ];

  const [iconColors, setIconColors] = useState(iconArr.map(val => val.defaultColor));
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleMouseOver = (index) => {
    if (selectedIcon !== index) { 
      const newColors = [...iconColors];
      newColors[index] = iconArr[index].hoverColor;
      setIconColors(newColors);
    }
  }

  const handleMouseOut = (index) => {
    if (selectedIcon !== index) {
      const newColors = [...iconColors];
      newColors[index] = iconArr[index].defaultColor;
      setIconColors(newColors);
    }
  }

  const handleClick = (index) => {
    const newColors = iconArr.map((icon, i) => i === index ? icon.hoverColor : icon.defaultColor); // Change only the clicked icon's color
    const msg = iconArr[index].msg
    setUserObj({...userObj,['review']:msg})
    setIconColors(newColors);
    setSelectedIcon(index);
  }

  const inptFun = (e) => {
    let { name, value } = e.target
    setUserObj({ ...userObj, [name]: value })
  }

  const submtForm = (e) => {
    e.preventDefault();
    let newList = [...list, userObj];
    setList(newList);
    localStorage.setItem('list', JSON.stringify(newList))
    setUserObj({});
    setIconColors(iconArr.map((val)=>val.defaultColor))
  }

  return (
    <div>
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-content">
              <h3>User Registration Feedback</h3>
              <span>We would love to hear your thoughts about your registration experience.</span>
              <Form onSubmit={submtForm} className='mt-4'>
                {
                  formType.map((val, i) => {
                    if (val.type === 'firstName') {
                      return (
                        <div className="row" key={i}>
                          <div className="col-6">
                            <Input type={val} inptFun={inptFun} userObj={userObj} />
                          </div>
                          <div className="col-6">
                            <Input
                              type={formType.find(f => f.type === 'lastName')}
                              inptFun={inptFun}
                              userObj={userObj}
                            />
                          </div>
                        </div>
                      )
                    } else if (val.type !== 'lastName') {
                      return (
                        <div className="col-12" key={i}>
                          <Input type={val} inptFun={inptFun} userObj={userObj} />
                        </div>
                      )
                    }
                  })
                }
                <h5 className='my-4 fw-bold'>Rate your experience</h5>
                <h6 className='my-0 fw-bold'>Registration Process</h6>
                <span className='text-secondary'>How would you rate your experience with the registration process?</span>
                <div className="icons d-flex">
                  {
                    iconArr.map((val, index) => {
                      const IconComponent = val.ico;
                      return (
                        <span
                          key={val.id}
                          onMouseOver={() => handleMouseOver(index)}
                          onMouseOut={() => handleMouseOut(index)}
                          onClick={() => handleClick(index)}
                          style={{ cursor: 'pointer', margin: '0 10px 0 0' }}
                        >
                          <IconComponent fontSize={'40px'} color={iconColors[index]} />
                        </span>
                      )
                    })
                  }
                </div>
                <div className="form-btn text-center">
                  <Button className='fw-bold mt-3' type='submit'>Submit Feedback</Button>
                </div>
              
              </Form>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <h1 className='text-center' >All Users</h1>
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
      </div>
    </div>
  )
}

export default FormData;
