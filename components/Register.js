import React from 'react'
import styled from 'styled-components'

function Register() {
    return (
        <Container>
            <Box>
                <Text>
                    Member Register
                </Text>
                <TextInput placeholder="Name" keyboardType="email-address" />
                <TextInput placeholder="Email" keyboardType="email-address" />
                <TextInput placeholder="Password" secureTextEntry={true}/>
                <ButtonView>
                <ButtonText>Register</ButtonText>
                </ButtonView>
                <SmallText>Already Registered ? <Blue> Login</Blue></SmallText>
            </Box>
        </Container>
    )
}


const Container = styled.View`
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  background:rgba(0,0,0,0.75);
  justify-content:center;
  align-items:center;
  overflow:hidden
`;

const Box = styled.View`
  width:90%;
  height:336px;
  margin-top:50px;
  background:white;
  border-radius:15px;
`;

const Text = styled.Text`
  font-size:20px;
  font-weight:bold;
  color:black;
  text-align:center;
  margin-top:19px;
  margin-bottom:-10px;

`;

const TextInput = styled.TextInput`
margin-top:20px;
width:90%;
height:38px;
background:#e4e4e4;
border-radius:10px;
margin-left:13px;
padding-left:12px;
`;

const ButtonText = styled.Text`
 color:white;
 text-transform:uppercase;
 font-weight:200;
 font-size:18px;
`;


const ButtonView = styled.View`
 background:#48a7ff;
 border-radius:10px;
 width:187px;
 height:38px;
 justify-content:center;
 align-items:center;
 margin-top:30px;
 margin-left:70px;
 

`;

const SmallText = styled.Text`
margin-top:22px
text-align:center;
`;

const Blue = styled.Text`
color:#48a7ff;
`;


export default Register
