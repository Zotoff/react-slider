import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import styled from 'styled-components';

const Repair = styled.div`
    color: #000;
    font-size: 40px;
    font-weight: 700;
    line-height: 30px;

    span {
        display: block;
        font-size: 24px;
        line-height: 30px;
    }
`
const LightText = styled.div`
    color: #000;
    font-size: 18px;
    line-height: 28px;
    font-weight: 300;
    margin-top: 54px;
`
const CallBtn = styled.button`
    width: 247px;
    height: 67px;
    background-color: #ffa14b;
    border-radius: 30px;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin-top: 30px;
`

class Main extends React.Component {
    render() {
        return (
            <Row>
                <Col lg={5}>
                    <Repair>
                        Качественный ремонт
                        <span>iPhone за 35 минут и гарантия 1 год</span>
                    </Repair>
                    <LightText>
                        Оставьте заявку на бесплатную диагностику без очереди, и получите защитное стекло стоимостью 1000 рублей с установкой в подарок!
                    </LightText>
                    <CallBtn>Отправить заявку</CallBtn>
                </Col>
                <Col lg={6} lgOffset={1}>

                </Col>
            </Row>
        );
    }
}

export default Main;