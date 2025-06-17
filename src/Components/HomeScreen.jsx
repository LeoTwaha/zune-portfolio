import React, { useEffect, useRef, useState } from "react";

export default function HomeScreen({index, setIndex, setSelectedBtn, setScreen, skills, setTabSlide, lastInput, setLastInput, animation, setAnimation}){
     const btnBox = useRef(null);
     useEffect(() => {
        const buttons = Array.from(btnBox.current.children)
        buttons.forEach(btn => btn.className = 'home-btn');
        btnBox.current.children[index].classList.add('selected');
        setSelectedBtn(btnBox.current.children[index].id);
    }, [index]);
    function handleHover(e){
        const buttons = Array.from(btnBox.current.children);
        setIndex(buttons.indexOf(e.target))
        setSelectedBtn(e.target.id);
        setLastInput('hover');
    }
    function handleClick(e){
       setAnimation('fade-out');
       setTimeout(() => {
        if (e.target.id === 'about') {
        setIndex([0, 0]); 
         setTabSlide(skills);
      } else if(e.target.id === 'projects'){
        setIndex([0, 0]);
        setTabSlide(0);
      } else if(e.target.id === 'certs'){
        setIndex(0);
      }
        setAnimation('fade-in');
        setScreen(e.target.id)
       }, 200);
        
    }
     const [time, setTime] = useState(null);

useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const a = timeString.replace('M', '');
    const c = a.replace('A', '');
    const parsedTime = c.replace(' P', 'p');
    setTime(parsedTime);
  };

  updateTime(); 

  const interval = setInterval(updateTime, 60000);

  return () => clearInterval(interval);
}, []);
    
    return(
       
        <div id='homeScreen-container'  className={animation}>
        <div id='btn-box' style={lastInput === 'hover'? {} : {marginTop: `-${index * 55}px`}} ref={btnBox}>
       
        <button id='about' onClick={handleClick} onMouseEnter={ handleHover} className="home-btn">about</button>
        <button id='projects' onClick={handleClick} onMouseEnter={ handleHover} className="home-btn">projects</button>
        <button id='certs' onClick={handleClick} onMouseEnter={ handleHover} className="home-btn">certs</button>
        <button id='contact' onClick={handleClick} onMouseEnter={ handleHover} className="home-btn">contact</button>
        <button id='settings' onClick={handleClick} onMouseEnter={ handleHover} className="home-btn">settings</button>
        </div>
        <div id='icon-box'>
            <p>{time}</p>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px'}}>
                <i className="fa-solid fa-wifi"></i>
                <i className="fa-solid fa-battery-full"></i>
            </div>
        </div>
        </div>
       
    )
}