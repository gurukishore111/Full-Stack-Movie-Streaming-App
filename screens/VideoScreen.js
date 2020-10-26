import React from "react";
import {Video} from "expo-av"
import  styled  from 'styled-components';
import { StatusBar } from "expo-status-bar";
import { ScrollView,TouchableOpacity } from 'react-native';
import MedCard from "../components/MedCard";
import MoiveCard from './../components/MoiveCard';

const VideoScreen = ({navigation,route}) => {
  const { video } = route.params;
  const { AllData } = route.params;
  const { SubData } = route.params;

  //console.log((video);
  return (
    <Container >
      <ScrollView showsVerticalScrollIndicator={false}>
      <VideoContainer>
      <Video source={{
        uri:video.video
      }} shouldPlay resizeMode="cover" useNativeControls={true}  style={{ width:"100%",height:"100%" }}/>
      </VideoContainer>
      <VideoTitle>
         {video.title}
      </VideoTitle>
      <MedContainer>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          AllData.map((data,index)=>(
          <TouchableOpacity key={index} onPress={() => navigation.navigate("Video",{video:data})} >
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
          SubData.map((data,index )=>(
          <TouchableOpacity key={index} onPress={() => props.navigation.navigate("Video",{video:data})} >
           <MoiveCard image={data.image} />
           </TouchableOpacity>
          ))
        }
      </ScrollView>
      </MovieContainer> 
      <StatusBar style="light" />
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
flex:1;
background:white;
`;


const VideoContainer =styled.View`
width:100%;
height:251px;
background:black;

`;

const VideoTitle =styled.Text`
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color:gray;
font-size:18px;
font-weight:600
`;

const MedContainer = styled.View`

margin-top:13px;


`;

const MovieContainer =styled.View`
margin-top:13px;
margin-bottom:12px;
`;

const Text = styled.Text`
margin-top:20px;
margin-left:10px;
color:#18171C;
font-size:14px;
font-weight:600;
text-transform:uppercase


`;


export default VideoScreen;