import { useRef, useEffect, useState } from 'react';
import {skills as skillsOg} from '../skills';
export default function About({index, setIndex, skills, animation}){
    const aboutBox = useRef(null);
    const indicatorBox = useRef(null);
         useEffect(() => {
            
            const buttons = Array.from(aboutBox.current.children)
            buttons.forEach(btn => btn.className = 'heading');
            aboutBox.current.children[index[0]].classList.add('selected');
            if(index[1] === 0){
              aboutBox.current.children[index[0]].classList.add('selected-heading');  
            }
            
        }, [index]);
       useEffect(() =>{
          if(indicatorBox.current){
          
            const cirles = Array.from(indicatorBox.current.children);
            const i = skillsOg.indexOf(skills[0]);
            cirles.forEach(cirle => cirle.className = 'circle');
            indicatorBox.current.children[i].classList.add('white');
          }
       }, [skills, index]);
        function handleHover(e){
            const buttons = Array.from(aboutBox.current.children);
            setIndex([buttons.indexOf(e.target), 0])
            
            
        }
        
        
    return (
        <div id='about-container' className={animation}>
            <div ref={aboutBox} id='about-heading'>
                <div  onMouseEnter={handleHover} className="heading">about</div>
                <div  onMouseEnter={handleHover} className="heading">skills</div>
            </div>
            <section>
             <div>
            <img id='headshot' src='/imgs/HeadShot.jpg' />
             </div>
             {index[0] === 0? <div>
                <p>My Name is</p>
                <h2>Leo Twaha</h2>
                <p>I Am a</p>
                <h2>Front-End Developer</h2>
             </div>
             :
             <div id='skills' onMouseEnter={() => setIndex([1, 1])}>
                <h2>Skills</h2>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '80%', gap: '2px'}}>
                    
                <div id='skill-icon-container'>
                        
                        <div style={{paddingTop: '35px'}} className='skill-icon'>
                        
                        <img  src={skills[skills.length - 1].icon} alt={skills[skills.length - 1].name}/>
                        </div>
                        <div className='skill-icon'>
                        <p style={{marginBottom: '2px'}}className='icon-title'>{skills[0].name}</p>
                        <img style={{border: `2px solid ${skills[0].color}`, borderRadius: '5px', padding: '5px', boxShadow: `0px 0px 10px ${skills[0].color}`}} src={skills[0].icon} alt={skills[0].name}/>
                        </div>
                        <div style={{paddingTop: '35px'}} className='skill-icon'>
                        
                        <img  src={skills[1].icon} alt={skills[1].name}/>
                        </div>
                        
               
                </div>
                 <div id='indicator' ref={indicatorBox} style={{ width: '100%', height: '10%'}}>
                          <div className='circle'></div>
                          <div className='circle'></div>
                          <div className='circle'></div>
                          <div className='circle'></div>
                          <div className='circle'></div>
                          <div className='circle'></div>
                          <div className='circle'></div>
                          <div className='circle'></div>
                        </div>
                </div>
             </div>
               }
            </section>
            

        </div>
    )
}