import React from 'react'
import styled from "styled-components"


const Header = styled.h1`
    font-size: 1em;
    margin-bottom: 14px;
    justify-content: center;
    align-items: center;
    display:flex;

`


const Title = () => {
  return (
    <Header>Demo editor by Sameer Bhardiya</Header>
  )
}

export default Title