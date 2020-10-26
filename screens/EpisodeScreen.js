import React from "react";
import styled from "styled-components";
import {ScrollView,TouchableOpacity,Dimensions,View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import MedCard from "../components/MedCard";
import  Carousel  from 'react-native-snap-carousel';



const screenWidth = Dimensions.get('window').width;


class EpisodeScreen extends React.Component{

    _renderItem({item,index}){
        return (
            <View style={{borderRadius:8,overflow:"hidden"}}>
              <Image source={{uri:item.video}} style={{width:"100%",height:200}} />
            </View>
        )
    }

    render(){
        const { episode } = this.props.route.params;
        const { AllData } = this.props.route.params;
        const { SubData } = this.props.route.params;

        return (

            <ScrollView>
         <Container>
          <CoverImage> 
            <Image source={{uri:episode.video}}  /> 
          </CoverImage>
          <VideoTitle>
         {episode.title}
      </VideoTitle>
      <Text>Continue Watching</Text>
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
      <Text>Lastest Episodes</Text>
      <SlideContainer>
      <Carousel 
            ref={c => this.carousel = c}
            data={SubData}
            renderItem={this._renderItem}
            itemWidth={326}
            sliderWidth={screenWidth}
            autoplay   
            inactiveSlideScale={0.95}
            loop
            layout={"stack"}
            // activeAnimationType="timing"
            // activeAnimationOptions={{
            //   friction:4,
            //   tension:40
            // }}
            enableMomentum={true}
            activeSlideAlignment={"start"}
            autoplayInterval={2000}
            autoplayDelay={4000}
            contentContainerCustomStyle={{
                height:220,
                marginLeft:30,
            }}
            />
            </SlideContainer>
           
          <StatusBar style="light"/>
         </Container>
         </ScrollView>
        )
    }
}

const Container = styled.View`
flex:1;
background:white
`;


const VideoTitle =styled.Text`
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color:gray;
font-size:18px;
font-weight:600
`;

const Text = styled.Text`
margin-top:20px;
margin-left:10px;
color:#18171C;
font-size:14px;
font-weight:600;
text-transform:uppercase


`;

const SlideContainer = styled.View`
margin-top:13px;

`;


const MedContainer = styled.View`

margin-top:13px;


`;

const CoverImage = styled.View`

width:100%;
height:229px;



`;

const Image = styled.Image`

width:100%;
height:100%;
background:black;



`;


export default EpisodeScreen;