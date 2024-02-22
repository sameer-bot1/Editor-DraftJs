import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
`
const H1  = styled.p`
 text-align : center;
 align-items: center;
`

const Instruction = () => {
  return (
    <Container>
        <H1> #  : Header 1</H1>
        <H1> *  : Bold </H1>
        <H1> +  : red line </H1>
        <H1> -  : Underline </H1>


    </Container>
  )
}

export default Instruction