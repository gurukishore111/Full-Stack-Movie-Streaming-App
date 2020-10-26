import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dimensions, TouchableOpacity, View ,Animated ,TouchableWithoutFeedback, Alert, AsyncStorage } from 'react-native';
import Loading from './Loading';
import { StatusBar } from 'expo-status-bar';
import Success from './Success';
import { connect } from 'react-redux';
import firebase from './../config';

const SHeight = Dimensions.get("window").height;

function mapStateToProps(state){
  return {menu:state.menu};
}

function mapDispatchToProps(dispatch){
  return {
      closeLogin:() =>{
          dispatch({
              type:'CLOSELOGIN'
          })
      },
      Login:(email) =>{
        dispatch({
          type:'LOG',
          email:email
        })
      }
  }
}

function Login(props) {

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [success,setsuccess] = useState(false);
    const [top, settop] = useState(new Animated.Value(SHeight+100)); 
    const [scale,setScale] = useState(new Animated.Value(1.3));
    const [transformY,settransformY] = useState(new Animated.Value(0));
    
  let setUser = async (name) =>{
      try {
        await AsyncStorage.setItem('userName',name)
      } catch (error) {
        //console.log((error)
      }
  }

let getUser = async () =>{
    try {
      const name = await AsyncStorage.getItem('userName')
      if(name !== null ){
        //console.log(("Name.........................................................",name);
        props.Login(name);
      }
    } catch (error) {
      //console.log((error)
    }
}

    const handleSubmit = () =>{
        setLoading(true)
        ////console.log(("email:",email,"password",password);

        // setTimeout(() => {
        //     setLoading(false);
        //     setsuccess(true);
        // }, 2000);

        // setTimeout(() =>{
        //  setsuccess(false)
        //  props.closeLogin();
        // },3000)

        firebase.auth().signInWithEmailAndPassword(email,password).catch((err) =>{
          Alert.alert('Error',err.message);
        }).then((response) =>{
            setLoading(false);
           // setsuccess(true);
           setUser(response.user.email)
           props.Login(response.user.email);
           if(response){
              setsuccess(true);
              setTimeout(() =>{
              setsuccess(false)
              props.closeLogin();
              },1100)
           }
          }
        );
}

 
    
    useEffect(() =>{
     if(props.menu === 'openLogin'){
        Animated.timing(top,{toValue:0,duration:10}).start()
        Animated.spring(scale,{toValue:1}).start()
        Animated.timing(transformY,{toValue:0,duration:0}).start()

     }else if(props.menu === 'closeLogin'){
       setTimeout(() =>{
        Animated.timing(top,{toValue:SHeight,duration:0}).start()
       Animated.spring(scale,{toValue:1.3}).start()
       },500)   
       Animated.timing(transformY,{toValue:SHeight+200,duration:500}).start()
     }
     getUser();
    },[props.menu])

   const TapBackground = () =>{
    props.closeLogin();
   }
    return (
        <AnimatedConatiner style={{top:top}}>
          <TouchableWithoutFeedback onPress={TapBackground} style={{position:"absolute",top:0,left:0}}>
          <BlackOpacity /> 
          </TouchableWithoutFeedback>          
            <AnimatedBox style={{transform :[{scale:scale},{translateY:transformY}]}}>
                <Text>
                    Member Login
                </Text>
                <TextInput placeholder="Email" keyboardType="email-address" onChangeText={(email) =>{setemail(email)}} />
                <TextInput placeholder="Password" secureTextEntry={true}   onChangeText={(password) =>{setpassword(password)}}/>
                <TouchableOpacity onPress={handleSubmit}>
                <ButtonView>
                <ButtonText>Login</ButtonText>
                </ButtonView>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => props.navigation.navigate("Episode",{episode:data,AllData:medCardData,SubData:moiveCardData})}>
                <View>
                <SmallText>For New Babie ? 
                 <Blue> Register</Blue>
                    </SmallText>
                    </View>
                </TouchableOpacity> */}
            </AnimatedBox>
            <Loading isActive={loading} />
            <Success isActive={success}/>
            <StatusBar style="dark" />
        </AnimatedConatiner>
    )
}


const Container = styled.View`
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  justify-content:center;
  align-items:center;
  overflow:hidden
`;

const BlackOpacity = styled.View`
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  background:rgba(0,0,0,0.75);
`;

const AnimatedConatiner =  Animated.createAnimatedComponent(Container)

const Box = styled.View`
  width:90%;
  height:336px;
  margin-top:50px;
  background:white;
  border-radius:15px;
`;
const AnimatedBox =  Animated.createAnimatedComponent(Box)

const Text = styled.Text`
  font-size:20px;
  font-weight:bold;
  color:black;
  text-align:center;
  margin-top:22px;
  margin-bottom:20px;

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
 margin-top:40px;
 margin-left:70px;
 

`;

const SmallText = styled.Text`
margin-top:22px
text-align:center;
`;

const Blue = styled.Text`
color:#48a7ff;
`;


export default connect(mapStateToProps,mapDispatchToProps)(Login)
