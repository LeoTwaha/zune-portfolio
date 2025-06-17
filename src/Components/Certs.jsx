import { useState, useRef, useEffect } from "react";
import { certs } from "../certifications";

export default function Certs({ index, setIndex, setModalImg }) {
  const certContainer = useRef(null);
  

  useEffect(() => {
    const certsBoxes = Array.from(certContainer.current.children);
    certsBoxes.forEach(cert => cert.className = "certs");
    certContainer.current.children[index].classList.add('selected-cert');
  }, [index]);

  function handleHover(e) {
    const certsBoxes = Array.from(certContainer.current.children);
    setIndex(certsBoxes.indexOf(e.currentTarget));
  }

  function handleClick(e) {
    const imgSrc = e.currentTarget.querySelector("img").src;
    setModalImg(imgSrc);
  }

  
  return (
    <>
      <h1 id='title'>certifications</h1>
      <div id='certContainer' ref={certContainer}>
        {certs.map((cert, i) => (
          <div onMouseEnter={handleHover} onClick={handleClick} className="certs" key={i}>
            
            <img src={cert.img} alt={cert.Name} />
            <div>
              <p><span>{cert.Name}</span>(click to enlarge)</p>
              <p>{cert.from}</p>
              <p>{cert.date}</p>
            </div>
          </div>
        ))}
      </div>
       
    </>
  );
}