export default function Startup({setScreen}){
    setTimeout(() => setScreen('home'), 2200)
    return (
     <div id='startup-container'>
      <img src='imgs/logos/ZuneLogo.png' />
      <div id='bar'>
        <div id='loaded'>

        </div>
        <p  style={{color: 'white', fontSize: '10px', textAlign: 'center'}}>v1.0 Leo Twaha's Portfolio</p>
      </div>
    </div>
)
}