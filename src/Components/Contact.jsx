import { contactInfo } from "../contactInfo"
export default function Contact(){
    return (
        <>
        <h1 id='title'>CONTACT</h1>
        {contactInfo.map((link, i) => {
            return(
                <a key={i} className="contact" href={link.link} target="_blank">
                    <img className="contactLogo" src={link.logo} alt={link.name}/>
                    <div className="contact-info">
                    <p>{link.name}</p>
                    <p>{link.info}</p>
                    </div>
                </a>
            )
        })}
        </>
    )
}