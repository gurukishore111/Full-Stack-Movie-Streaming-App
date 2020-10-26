import React from 'react'
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons/';

function MenuCard({option,icon,caption}) {
    return (
        <Container>
            <IconCContainer>
            <Ionicons name={icon} size={30} color="#595959" />
            </IconCContainer>
            <Content>
            <MenuButton>
          {option}
         </MenuButton>
         <MenuText>
             {caption}
         </MenuText>
            </Content>
         </Container>
    )
}
const Container =styled.View`
 flex-direction:row;
  margin:15px 0 ;
`;

const MenuButton = styled.Text`
font-size:18px;
font-weight:600;
color: #595959;
`;

const MenuText = styled.Text`
font-size:13px;
color: #595959;
margin-top:5px;
opacity:0.6;
`;

const IconCContainer =styled.View`
width:32px;
height:32px;
justify-content:center;
align-items:center;
`;


const Content =styled.View`
padding-left:20px;`;

export default MenuCard
