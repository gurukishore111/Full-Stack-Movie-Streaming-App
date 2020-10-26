import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import LottieAnimation from "lottie-react-native";
import {Animated, Dimensions} from 'react-native';

const Sheight = Dimensions.get("window").height; 

function Loading(props) {

    let Animation;
    const [top,setTop] = useState(new Animated.Value(0));
    const [opacity,setOpacity] = useState(new Animated.Value(0))

    useEffect(() =>{
        Update();
    },[props.isActive])
   

    function Update(){
        if(props.isActive){
            Animated.timing(top,{toValue:0,duration:0}).start();
            Animated.timing(opacity,{toValue:1}).start();
            Animation.play();
        }else{
            Animated.timing(top,{toValue:Sheight+100,duration:0}).start();
            Animated.timing(opacity,{toValue:1}).start()
        }
    }

    return (
        <AnimatedContainer style={{top:top,opacity:opacity}}>
         <LottieAnimation source={require("../assets/loader.json")} autoPlay={false} loop
         ref={animation =>{
            Animation = animation
         }} />
        </AnimatedContainer>
    )
}

const Container = styled.View`
width:100%;
height:100%;
position:absolute;
background:rgba(255,255,255,0.9);
top:0;
left:0;
justify-content:center;
align-items:center;
`;


const AnimatedContainer = Animated.createAnimatedComponent(Container)

export default Loading;
