import React, { Component } from 'react';

import Slide_1 from '../img/slide-1.jpeg';
import Slide_2 from '../img/slide-2.png';
import Slide_3 from '../img/slide-3.jpeg';

class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            slides: [
                {
                    eachSlide: `url(${Slide_1})`
                },
                {
                    eachSlide: `url(${Slide_2})`
                },
                {
                    eachSlide: `url(${Slide_3})`
                }
            ],
            autoplay: false,
            active: 0,
            max: 0
        }
        this.state.max = this.state.slides.length; //максимальное кол-во слайдов зависит от длины массива
        this.intervalBetweenSlides = this.intervalBetweenSlides.bind(this); //связываем с контекстом вызова
        this.toggleAutoPlay = this.toggleAutoPlay.bind(this);
        this.nextOne = this.nextOne.bind(this);
        this.prevOne = this.prevOne.bind(this);
    }
    //производим действие когда элемент появляется на странице
    componentDidMount(){
        //вызываем функцию каждые три секунды
        this.interval = setInterval(()=>this.intervalBetweenSlides(), 3000)
    }
    //производим действие когда элемент удаляется со страницы
    componentWillUnmount(){
        //чистим интервал
        clearInterval(this.interval)
    }
    //автопереключение слайдов
    intervalBetweenSlides(){
        if(this.state.autoplay === true) {
            //если индекс активного слайдера дошел до конца
            if(this.state.active === this.state.max-1) {
                this.state.active = 0;
            } else {
                this.state.active++; //переключаем на 1 слайд вперёд
            }
            //изменяем положение позиции active
            this.setState({
                active: this.state.active
            })
        }
    }
    toggleAutoPlay(){
        this.setState({
            autoplay: !this.state.autoplay //чтобы параметр автоматически переключался с true на false при вызове функции
        })
    }
    //обработка кликов по стрелкам
    nextOne() {
        //меняем следующий слайд на активный если активный меньше максимального
        (this.state.active < this.state.max - 1) ? this.setState({
            active: this.state.active + 1
        }) : this.setState({
            active: 0
        })
    }
    prevOne(){
        (this.state.active > 0) ? this.setState({
            active: this.state.active - 1
        }) : this.setState({
            active: this.state.max - 1
        })
    }
    //работа с точками навигации
    dots(index, event){
        this.setState({
            active: index
        })
    }
    //возвращает строку active для активного элемента
    isActive(value){
        if(this.state.active === value) {
            return 'active'
        }
    }
    //методы для рендеринга
    setSliderStyles(){
        const transition =this.state.active * - 100/this.state.slides.length; //сколько занимает каждый из слайдов в процентах
        return {
            width: (this.state.slides.length * 100) + '%',
            transform: `translateX(${transition}%)`
        }
    }
    renderSlides() {
        const transition = 100/this.state.slides.length + '%'
        return this.state.slides.map((item, index) => (
            <div 
                className='each-slide'
                key = {index}
                style = {{backgroundImage: item.eachSlide, width: transition}}>
            </div>
        ))
    }
    renderDots() {
        return this.state.slides.map((item, index) => (
            <li
                className={this.isActive(index) + ' dots'} //если элемент с индексом активный, будет подставляться строка active. Класс должен подставляться через пробел, т.к. задаем несколько классов.
                key = {index}
                ref = "dots"
                //обработчик события
                //привязываем метод к индексу элемента, который перебирается
                onClick = {this.dots.bind(this, index)}> 
                <a>&#9679;</a>
            </li>
        ))
    }
    renderPlayStop(){
        let playStop;
        if(this.state.autoplay){
            playStop = <svg fill='#FFFFFF' height='24' viewBox='0 0 24 24' width='24'>
                        <path d='M0 0h24v24H0z' fill='none'/>
                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z'/>
                        </svg>;
        } else {
            playStop = <svg fill='#FFFFFF' height='24' viewBox='0 0 24 24' width='24'>
                        <path d='M0 0h24v24H0z' fill='none'/>
                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z'/>
                        </svg>;
        }
        return playStop
    }
    renderArrows(){
        return (
            <div>
                <button
                    type="button"
                    className="arrows prev"
                    onClick={this.prevOne}
                >
                    <svg fill='#FFFFFF' width='50' height='50' viewBox='0 0 24 24'>
                        <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/>
                        <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </button>
                <button
                    type="button"
                    className="arrows next"
                    onClick={this.nextOne}
                >
                    <svg fill='#FFFFFF' height='50' viewBox='0 0 24 24' width='50'>
                        <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/>
                        <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </button>
            </div>
        )
    }
    //Глобальный рендер
    render(){
        return(
            <div className="slider">
                <div
                    className = "wrapper"
                    style={this.setSliderStyles()}>
                        {this.renderSlides()}
                    </div>
                    {this.renderArrows()}
                    <ul className="dots-container">
                        {this.renderDots()}
                    </ul>
                    <a className="toggle-play"
                        onClick={this.toggleAutoPlay}>
                        {this.renderPlayStop()}
                    </a>
            </div>
        )
    }

}

export default Slider;
/*SVG
<svg fill='#FFFFFF' height='24' viewBox='0 0 24 24' width='24'>
    <path d='M0 0h24v24H0z' fill='none'/>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z'/>
</svg>;

<svg fill='#FFFFFF' height='24' viewBox='0 0 24 24' width='24'>
    <path d='M0 0h24v24H0z' fill='none'/>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z'/>
</svg>;

<!-- Arrows -->
<svg fill='#FFFFFF' width='50' height='50' viewBox='0 0 24 24'>
    <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/>
    <path d='M0 0h24v24H0z' fill='none'/>
</svg>

<svg fill='#FFFFFF' height='50' viewBox='0 0 24 24' width='50'>
    <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/>
    <path d='M0 0h24v24H0z' fill='none'/>
</svg>
*/