import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ScrollView, TouchableOpacity,Animated,Dimensions } from 'react-native';
import styled from 'styled-components'
import BannerCard from './../components/BannerCard';
import MedCard from './../components/MedCard';
import { Ionicons } from "@expo/vector-icons"
import Menu from './../components/Menu';
import { connect } from 'react-redux';
import MoiveCard from '../components/MoiveCard';
import firebase from "../config";
import EpisodeScreen from './EpisodeScreen';
import Login from '../components/Login';
import Loading from '../components/Loading';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function mapStateToProps(state){
    return {menu:state.menu,log:state.log}
}

function mapDispatchToProps(dispatch){
  return {
        openMenu : () => dispatch({
          type:'OPEMENU'
      }),
        openLogin:() =>{
          dispatch({
            type:'OPENLOGIN'
          })
        },
  }
}

 function HomeScreen(props) {
  const [top, settop] = useState(new Animated.Value(screenHeight+100));
  const [opacity,setOpacity] =useState(new Animated.Value(0));
  const [bannerCardData,setBannerCardData] =useState([]);
  const [medCardData,setMedCardData] =useState([]);
  const [moiveCardData,setMoiveCardData] =useState([]);

  useEffect(() =>{
    blackScreen();
    loadBannerData();
    loadMedData();
    loadMoiveData();
  },[props.menu])

const loadBannerData =() =>{
    let database  = firebase.database().ref().child('BannerCardData');
    database.on('value',snap =>{
      let BannerCardData =[];
        snap.forEach(child =>{
          BannerCardData.push({
            title:child.val().title,
            image:child.val().image,
          })
        })
        setBannerCardData(BannerCardData);
        //console.log((bannerCardData)
    }) 
}

const loadMedData = () =>{
  let database  = firebase.database().ref().child('MedCardData');
  database.on('value',snap =>{
    let MedCardData =[];
      snap.forEach(child =>{
        MedCardData.push({
          title:child.val().title,
          image:child.val().image,
          info:child.val().info,
          video:child.val().video,
        })
      })
      setMedCardData(MedCardData);
      //console.log((medCardData)
  }) 
}

const loadMoiveData = () =>{
  let database  = firebase.database().ref().child('MoiveCardData');
  database.on('value',snap =>{
    let MoiveCardData =[];
      snap.forEach(child =>{
        MoiveCardData.push({
          title:child.val().title,
          image:child.val().image,
          info:child.val().info,
          video:child.val().video,
        })
      })
      setMoiveCardData(MoiveCardData);
      //console.log((moiveCardData)
  }) 
}

  const blackScreen =() =>{
    if(props.menu =='openMenu'){
     Animated.timing(top,{toValue:0,duration:10}).start()
     Animated.timing(opacity,{toValue:0.6,duration:500}).start()
    }
    if(props.menu =='closeMenu'){
      Animated.timing(top,{toValue:screenHeight+100,duration:10}).start()
      Animated.spring(opacity,{toValue:0}).start()
    }
  }
  const handleLogin = () =>{
    if(props.log){
     props.openMenu()
    }else{
    props.openLogin()
    }
  }
  // //console.log(("...........................0",props.log);
  return (
    <Root>
      {bannerCardData.length === 0  && moiveCardData.length === 0 && medCardData.length === 0  ? <Loading isActive={true} /> : (
        <>
       <Main>
       <ScrollView showsVerticalScrollIndicator={false}>
       <Header style={{shadowColor: "gray",shadowOffset: {width: "100%",height: 1,},shadowOpacity: 0.58,shadowRadius: 16.00,elevation: 24 }}>
         <TouchableOpacity style={{position:"absolute",top:29,left:13,zIndex:100}} onPress={handleLogin} >
         <Ionicons name="ios-menu" color="gray" size={36}   />
         </TouchableOpacity>
         <Logo/>
        { props.log ===  "" ||  props.log === undefined ?  <Profile /> : <AvatorProfile source={{uri:"https://i.pinimg.com/736x/06/d0/00/06d00052a36c6788ba5f9eeacb2c37c3.jpg"}}  />  }
       </Header >
       <BannerContainer>
         <BannerCard data={bannerCardData} />
       </BannerContainer>
       <Text>Continue Watching</Text>
       <MedContainer>
       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
         {
           medCardData.map((data,index) =>(
           <TouchableOpacity key={index} onPress={() => props.navigation.navigate("Video",{video:data,AllData:medCardData,SubData:moiveCardData})} >
            <MedCard image={data.image}  info={data.info}/>
            </TouchableOpacity>
           ))
         }
       </ScrollView>
       </MedContainer>   
       <Text>You May Also Like</Text>
       <MovieContainer>
       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
         {
           moiveCardData.map((data,index) =>(
           <TouchableOpacity key={index} onPress={() => props.navigation.navigate("Episode",{episode:data,AllData:medCardData,SubData:moiveCardData})} >
            <MoiveCard image={data.image} />
            </TouchableOpacity>
           ))
         }
       </ScrollView>
       </MovieContainer>   
       <StatusBar style="dark" />
       </ScrollView>
     </Main>
     <AnimatedBlack style={{top:top,opacity:opacity}} />
     <Menu />
      <Login />
      </>
      ) }
    
    </Root>
  );
}


const Main = styled.View`
flex:1;
background-color:white;

`
const Root = styled.View`
flex:1;
`;


const BlackOpacity =styled.View`
position:absolute;
width:100%;
height:100%;
background-color:black;
opacity:0.6

`;


const AnimatedBlack = Animated.createAnimatedComponent(BlackOpacity);

const Header = styled.View`

width:100%;
height:75px;
background-color:white;

`

const Profile = styled.View`

position:absolute;
top:31px;
right:13px;
width:35px;
height:35px;
background:#C4C4C4;
border-radius:17px;


`
const AvatorProfile = styled.Image`

position:absolute;
top:31px;
right:13px;
width:35px;
height:35px;
background:#C4C4C4;
border-radius:17px;


`
const Logo = styled.View`
top:35px;
left:49px;
width:85px;
height:25px;
background:lightgray;
border-radius:20px;

`

const BannerContainer = styled.View`
margin-top:15px;
`;


const Text = styled.Text`
margin-top:20px;
margin-left:10px;
color:#18171C;
font-size:14px;
font-weight:600;
text-transform:uppercase


`;

const MedContainer = styled.View`

margin-top:13px;


`;

const MovieContainer =styled.View`
margin-top:13px;
margin-bottom:12px;
`;


export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);