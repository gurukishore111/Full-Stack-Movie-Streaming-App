import React from 'react'
import styled from 'styled-components'


function MoiveCard({image}) {
    return (
        <Container>
            <Image source={{uri:image}} />
        </Container>
    )
}


const Container = styled.View`

width:120px;
height:163px;
border-radius:4px;
background:white;
overflow:hidden;
margin-left:9px;

`;


const Image = styled.Image`
width:100%;
height:100%;
z-index:-5;

`;



export default MoiveCard
