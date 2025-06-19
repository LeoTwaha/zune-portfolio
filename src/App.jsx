import { useState, useEffect, useRef } from 'react'
import { HiPlayPause } from "react-icons/hi2";
import Startup from './Components/Startup';
import HomeScreen from './Components/HomeScreen';
import About from './Components/About';
import Projects from './Components/Projects';
import Certs from './Components/Certs';
import { certs } from "./certifications";
import Contact from './Components/Contact';
import Settings from './Components/Settings';
import { skills } from './skills';
import ReactDOM from "react-dom";
function App() {
  const [index, setIndex] = useState(0);
  const [tabSlide, setTabSlide] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState('about');
  const [screen, setScreen] = useState('startup');
  const [lastInput, setLastInput] = useState('');
  const [animation, setAnimation] = useState('');
  const [modalImg, setModalImg] = useState(null);
  const dialogRef = useRef(null);

  function closeModal() {
    setModalImg(null);
  }

  useEffect(() => {
    if (modalImg && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [modalImg]);

  function renderScreen(){
    
    switch(screen){
      case 'startup':
      return <Startup setScreen={setScreen}/>
      case 'home':
      return <HomeScreen animation={animation} setAnimation={setAnimation} index={index} lastInput={lastInput} setLastInput={setLastInput} setIndex={setIndex} setScreen={setScreen} setSelectedBtn={setSelectedBtn} skills={skills} setTabSlide={setTabSlide}/>
      case 'about': 
      return <About animation={animation} index={index} setIndex={setIndex} skills={tabSlide} />
      case 'projects':
      return <Projects animation={animation} index={index} tabSlide={tabSlide} />
      case 'certs':
      return <Certs index={index} setIndex={setIndex} setModalImg={setModalImg}/>
      case 'contact':
      return <Contact />
      case 'settings':
      return <Settings />
    }
  }
  function handleClick(e){
    
   
   switch(e.currentTarget.id){
    case 'back':
      setAnimation('');
     
      requestAnimationFrame(() => {
  // Force reflow
  document.getElementById(`${screen}-container`)?.offsetHeight;
   if(screen !== 'home'){
      setAnimation('fade-in-reverse');
      requestAnimationFrame(()=> {
       setTimeout(()=>{
      setScreen('home');
      setIndex(0);
      setAnimation('fade-out-reverse');
      }, 200);
      })
      
      }
  
});
      setTimeout(()=> {setAnimation('')}, 600);
    break;
   }
   switch(screen){
   case 'home':
   switch(e.currentTarget.id){
    case 'up':
    setLastInput('arrow');
    setIndex(prev => prev > 0? prev - 1 : 4);
    break;
    case 'down':
    setLastInput('arrow');
    setIndex(prev => prev < 4? prev + 1 : 0);
    break;
    case 'ok':
      setAnimation('fade-out');
      setTimeout(() => {
        setAnimation('fade-in');
        setScreen(selectedBtn);
        
        
       if (selectedBtn === 'about') {
        setIndex([0, 0]); 
        setTabSlide(skills);
        
       
      } else if (selectedBtn === 'projects'){
        setIndex([0, 0]);
        setTabSlide(0);
        console.log(index);

      } else if (selectedBtn === 'certs'){
        setIndex(0);
        console.log(index);

      }
      
    
      }, 400);
      
    break;
   }
    break;
    case 'about':
      switch(e.currentTarget.id){
      case 'down':
        if(index[0] === 1){
          console.log(index);
          setIndex([1, 1]);
        }
      break;
      case 'up':
        if(index[0] === 1){
          console.log(index);
          setIndex([1, 0]);
        }
      break;
    case 'left':
    if(index[1] === 1){
      const lastObj = tabSlide[tabSlide.length - 1];
        setTabSlide( prevSlide => {
          const newArr = [...prevSlide];
          newArr.pop();
          newArr.unshift(lastObj);

          return newArr;
        });
    }else{
    setIndex(prev => prev[0] === 0? [1, 0] : [0, 0]);
    }
    break;
    case 'right':
      if(index[1] === 1){
      const firstObj = tabSlide[0];
        setTabSlide( prevSlide => {
          const newArr = [...prevSlide];
          newArr.shift();
          newArr.push(firstObj);
          return newArr;
        });
    }else{
    setIndex(prev => prev[0] === 0? [1, 0] : [0, 0]);
    }
    break;
   }
   break;
   case 'projects':
   switch(e.currentTarget.id){
      case 'down':
      
          console.log(index);
          setIndex(prev => [prev[0], 1]);
        
      break;
      case 'up':
        if(index[1] === 1){
          console.log(index);
          setIndex(prev => [prev[0], 0]);
        }
      break;
    case 'left':
    if(index[1] === 0){
      setIndex(prev => prev[0] > 0? [prev[0] - 1, prev[1]] : [2, prev[1]]);
      setTabSlide(0);
    } else{
      setTabSlide(prev => prev > 0 ? prev - 1 : 0 );
    }
    break;
    case 'right':
      if(index[1] === 0){
      setIndex(prev => prev[0] < 2? [prev[0] + 1, prev[1]] : [0, prev[1]]);
      setTabSlide(0);
    } else{
      setTabSlide(prev => prev < 3 ? prev + 1 : 3 );
    }
    break;
   
  } 
   case 'certs':
   switch(e.currentTarget.id){
      case 'down':
      
          setIndex(prev => prev < 2? prev + 1 : prev);
         
        
      break;
      case 'up':
     
           setIndex(prev => prev > 0? prev - 1 : prev);

       
        
      break;
     case 'ok':
      setModalImg(certs[index].img);
    break;
  } 
  }
}
  return (
    <>
      {modalImg &&
        ReactDOM.createPortal(
          <dialog  ref={dialogRef} onClose={closeModal} onClick={closeModal} style={{border: 'none', backgroundColor: 'black', overflow: 'hidden'}}>
            <p style={{fontSize: '30px', color: 'white'}}>Click to Close</p>
            <img src={modalImg} alt="Certificate" style={{ maxWidth: "90vw", maxHeight: "90vh"}} />
          </dialog>,
          document.body
        )
      }
      <div id='mainBox'>
        <div id="screen">
          {renderScreen()}
        </div>
        <div id='controls-container'>
          <button onClick={handleClick} className='btn control' id='back'><i className="fa-solid fa-arrow-left"></i></button>
        <div id="d-Pad">
        
        <button id='up' onClick={handleClick} className='btn d-pad-btn'><i className="fa-solid fa-arrow-up"></i></button>
        
      
        
      
        <div id='x-axis'>
        <button id='left' onClick={handleClick} className='btn d-pad-btn'><i className="fa-solid fa-arrow-up"></i></button>
        <button id='ok' onClick={handleClick} className='btn'></button>
        <button id='right' onClick={handleClick} className='btn d-pad-btn'><i className="fa-solid fa-arrow-up"></i></button>
        </div>
        <button id='down' onClick={handleClick} className='btn d-pad-btn'><i className="fa-solid fa-arrow-up"></i></button>
        </div>
        <button className='btn control'><HiPlayPause /></button>
        </div>
      </div>
    </>
  )
}

export default App
