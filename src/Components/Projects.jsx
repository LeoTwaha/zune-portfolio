import {useRef, useEffect} from 'react';
import { projects } from '../projects';
export default function Projects({index, tabSlide, animation}){
    const projHeadings = [<div className="heading">aiproductfinder</div>, <div  className="heading">snake3d</div>, <div  className="heading">weatherapp</div>];
    const projHeadingsContainer = useRef(null);
    const dialog = useRef(null);
    useEffect(() => {
            const projects = Array.from(projHeadingsContainer.current.children)
            projects.forEach(proj => proj.className = 'heading');
            projHeadingsContainer.current.children[0].classList.add('selected');
            if(index[1] === 0){
              projHeadingsContainer.current.children[0].classList.add('selected-heading');  
            }
            
        }, [index]);
       
    return (
        <div id='projects-container'>
        <div id='projHeadings-container' ref={projHeadingsContainer}>
                
                {projHeadings[index[0]]}
                {projHeadings[index[0] < 2? index[0] + 1 : 0]}
                {projHeadings[index[0] + 1 < 2? index[0] + 2 : 0]}

                
        </div>
        <section>
            <div className='slide'>
                <img src={projects[index[0]].imgs[tabSlide]}/>
                <p>{tabSlide + 1} / 4</p>
            </div>
            <div id='proj-info'>
                <p><span>Description</span></p>
                <p>{projects[index[0]].descript}</p>
                <p><span>Tools</span></p>
                <p style={{marginBottom: '10px'}}>{projects[index[0]].tools}</p>
                <a id='link' href={projects[index[0]].link} target="_blank">Try It Now!</a>
            </div>
        </section>
        </div>
    )
}