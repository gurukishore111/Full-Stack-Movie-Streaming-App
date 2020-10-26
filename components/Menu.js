import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from "react-native"
import { LogBox, TouchableOpacity,Dimensions,AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import { connect } from 'react-redux';
import MenuCard from './MenuCard';
import firebase from './../config';
LogBox.ignoreAllLogs();


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function mapStateToProps(state){
 return {menu:state.menu}
}

function mapDispatchToProps(dispatch){
    return {
          closeMenu : () => {dispatch({
            type:'CLOSEMENU'
        })},
      Login:(email) =>{
        dispatch({
            type:'LOG',
            email:email
          })
       }
    }
}


function Menu(props) {
    const [top, settop] = useState(new Animated.Value(screenHeight+100));

    useEffect(() => {
        Menu();
    }, [props.menu])

    const Menu = () =>{
        if(props.menu == 'openMenu'){
            Animated.spring(top,{ toValue:screenHeight / 2 -50 }).start()
        }
        if(props.menu == 'closeMenu'){
            Animated.spring(top,{toValue:screenHeight+100}).start()
        }
    }

    const handleLogout = async () =>{
      props.Login()
      await AsyncStorage.clear();
      props.closeMenu()
    }

  

    return (
        <AnimatedContainer style={{position:"absolute",top:top,zIndex:100}}>
            <Cover>
                <LinearGradient colors={["rgba(255,148,115,1)", 'rgba(255,123,123,1)']} style={{
                    width:"100%",
                    height:"100%"
                }} />
                <MenuText>Menu</MenuText>
            </Cover>
            <TouchableOpacity style={{position:"absolute",top:120,left:"50%",marginLeft:-22}} onPress={props.closeMenu}>
            <CloseView style={{shadowColor: "#000",shadowOffset: {width: 20,height: 20,},shadowOpacity: 0.58,shadowRadius: 16.00,elevation: 24 }}>
               <Ionicons name="ios-close" size={40} color="gray" />
            </CloseView>
            </TouchableOpacity>
            <Content>
                <MenuCard option="Account" icon="ios-settings" caption="Profile" />
                <TouchableOpacity onPress={handleLogout}>
                <MenuCard option="Logout" icon="ios-log-out" caption="See you soon"/>
                </TouchableOpacity>
            </Content>
        </AnimatedContainer>
    )
}


const Container =styled.View`
width:100%;
height:100%;
background-color:white;
border-radius:26px;
overflow:hidden;

`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover =styled.View`

width:100%;
height:142px;

`;

const Content =styled.View`
width:100%;
height:100%;
padding:30px;
`;


const CloseView = styled.View`

width:44px;
height:44px;
border-radius:22px;
background:white;
justify-content:center;
align-items:center;
`;

const MenuText = styled.Text`
position:absolute;
font-size:25px;
color:white;
top:60px;
margin-left:42%

`;



export default connect(mapStateToProps,mapDispatchToProps)(Menu);