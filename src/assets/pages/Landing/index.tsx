import React, { useState,useEffect } from 'react'
import logoimg from '../../images/LLOGO.png'
import landingimg from '../../images/landing.svg'
import studyIcon from '../../images/icons/study.svg'
import giveClassesIcon from '../../images/icons/give-classes.svg'
import purpleHeartIcon from '../../images/icons/purple-heart.svg'
import './styles.css'
import {Link} from 'react-router-dom'
import api from '../../../services/api'
//import ideia from '../../images/icons/ideia.png'


function Landing (){
    const [totalConnections,setTotalConnections] = useState(7)
    useEffect(() =>{
        api.get('connections').then(response => {
            const {total} = response.data

            setTotalConnections(total)
        })
    }, [])
    return(

        <div className="Page-landing">
   
        <div id="page-landing-content" className='container'>
        
            <div className="logo-container">
                <img className='coruja' src={logoimg} alt="proffy"/>
                <h2>Levaremos você ao próximo nível!</h2>

            </div>

            <img 
                src={landingimg} alt="Plataforma de estudos"
                className="hero-image"
            />
            
            <div className="buttons-container">
               <Link to="/study" className="study">
                <img src={studyIcon} alt="estudar"/>
                Estudar
               </Link>

               <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar aulas"/>
                Dar aulas
               </Link>
            </div>

            <span className="total-connections">
                total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} className = 'heart' alt="coração roxo"/>
            </span>
        </div>
        </div>
    )
}
    
export default Landing
