import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
'mdbreact';

const Login = () => {
  return (
    <div>
    <MDBRow className="border d-flex align-items-center" style={{height: "18vh", paddingTop: "10px"}}>
        <MDBCol md='12' className="text-center">
            <h1 className="text-primary display-4" style={{fontSize: "50px"}}>Welcome to E-Gurukul</h1>
            <h1 className="text-muted display-6" style={{fontSize: "15px"}}>A place where innovation meets technology</h1>
        </MDBCol>
    </MDBRow>
    <MDBRow className="border d-flex align-items-center" style={{height: "75vh"}}>
      <MDBCol md='2'>
      </MDBCol>

      <MDBCol md='4'>
      <MDBCard>
          <MDBCardImage
            className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
            tag='div'
          >
            <h2>Admin Login</h2>
            <p></p>
          </MDBCardImage>
          <MDBCardBody cascade className='text-center'>
            <MDBCardText>
            </MDBCardText>
            <a
              href='!#'
              className='primary-text mt-1 d-flex justify-content-end align-items-center'
            >
              <MDBBtn gradient="blue">
                Go to page{' '}
                <MDBIcon
                  icon='chevron-right'
                  className='ml-2'
                  size='sm'
                ></MDBIcon>
              </MDBBtn>
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <MDBCol md='4'>
        <MDBCard>
          <MDBCardImage
            className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
            tag='div'
          >
            <h2>User Login</h2>
            <p></p>
          </MDBCardImage>
          <MDBCardBody cascade className='text-center'>
            <MDBCardText>
            </MDBCardText>
            <a
              href='/user/login'
              className='primary-text mt-1 d-flex justify-content-end align-items-center'
            >
              <MDBBtn gradient='blue'>
                Go to page{' '}
                <MDBIcon
                  icon='chevron-right'
                  className='ml-2'
                  size='sm'
                ></MDBIcon>
              </MDBBtn>
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md='2'>
      </MDBCol>
    </MDBRow>
    </div>
  )
}

export default Login;