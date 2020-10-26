import React from "react";
import { View, Text, StyleSheet,Image,Dimensions,TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import  Carousel  from 'react-native-snap-carousel';
import firebase from "../config";


const screenWidth = Dimensions.get("window").width;

class CardScreen extends React.Component {

 state={
    MoiveCardData:[],
    MedCardData:[]
 }


 componentDidMount(){
  this.database  = firebase.database().ref().child('MoiveCardData');
  this.database.on('value',snap =>{
    let MoiveCardData =[];
      snap.forEach(child =>{
        MoiveCardData.push({
          title:child.val().title,
          image:child.val().image,
          info:child.val().info,
          video:child.val().video,
        })
      })
      this.setState({MoiveCardData:MoiveCardData});
  })

  this.loadMedData();
}

 loadMedData(){
   this.database  = firebase.database().ref().child('MedCardData');
  this.database.on('value',snap =>{
    let MedCardData =[];
      snap.forEach(child =>{
        MedCardData.push({
          title:child.val().title,
          image:child.val().image,
          info:child.val().info,
          video:child.val().video,
        })
      })
      this.setState({MedCardData:MedCardData});
  }) 
}

  _renderItem = ({item,index}) =>{
    return(
      
      <View style={{borderRadius:10,overflow:"hidden",top:"29%"}}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Episode",{episode:item,AllData:this.state.MedCardData,SubData:this.state.MoiveCardData})}>
        <Image source={{uri:item.image}} style={{width:'100%',height:320}} />
        </TouchableWithoutFeedback>
      </View>

    )
  }
  render() {
    return (
      <Container>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <TextView>
         <Text style={{fontSize:20}}>Latest</Text>
        </TextView>
        <SlideContainer>
        <Carousel 
          ref={c => this.carousel = c}
          data={this.state.MoiveCardData}
          renderItem={this._renderItem}
          itemWidth={210}
          sliderWidth={screenWidth}
          autoplay   
          inactiveSlideScale={0.85}
          loop
          //layout={"tinder"}
          // activeAnimationType="timing"
          // activeAnimationOptions={{
          //   friction:4,
          //   tension:40
          // }}
          inactiveSlideShift={20}
          enableMomentum={true}
          activeSlideAlignment={"center"}
          autoplayInterval={2000}
          autoplayDelay={4000}
           />
      </SlideContainer>
      </Container>

    );
  }
}

const Container = styled.View`
flex:1;
justify-content:center;
align-items:center
background:#fafafa`;

const SlideContainer =styled.View`
margin-top:140px;
width:${screenWidth};
height:900px
`;

const Circle1 = styled.View`

position:absolute;
width:682px;
height:682px;
left:-135px;
top:-119px;
background:lightgray;
border-radius:341px;
`;

const Circle2 = styled.View`

position:absolute;
width:606px;
height:606px;
left:-18px;
top:-221px;
background:#eaeaea;
border-radius:341px;
`;

const Circle3 = styled.View`

position:absolute;
width:323px;
height:323px;
left:206px;
top:-119px;
background:#f2f2f2;
border-radius:161.5px;


`;

const TextView = styled.View`

position:absolute;
width:150px;
height:42px;
left:104px;
top:78px;
background:#ffffff;
border-radius:8px;
justify-content:center;
align-items:center

`;

export default CardScreen;