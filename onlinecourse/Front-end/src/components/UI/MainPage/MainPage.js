import React from 'react';
import './MainPage.css';


const mainPage = (props)=> {

    let oup = null;

    if(props.oup){
            
            oup = (<>
                        <br/><span className="heading-3">Own Your </span>
                        <span className="heading-4">PATH</span>
                    </>); 

                  }


        return(

            <>
                <h1 className="Content-text"><span className="heading-1">{props.heading1}</span> 
                <br/><span className="heading-2">{props.heading2}</span>

               {oup} 

                
            
               </h1>
            </>

        );
    
}

export default mainPage;