import React,{Component} from "react";
import {Link} from 'react-router-dom';
import './CSS/HomeBanner.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
class HomepageBanner extends Component{

    render(){
        let text=null;
        let Banner=null;

        if(this.props.img){
             text = ( <p className="Banner-text">The EXPERT in Anything <br/>Was Once A BEGINNER..</p> );
            }

        if(this.props.img){
            Banner=( <div className="BannerSection">

                     <img className="BannerImage" 
                     src={"https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-office-training-learning-banner-poster-background-image_182795.jpg"} alt="banner1"/>

                    </div>);
        }

        if(this.props.img === null){
            
            text = (
                    
                    <div className="Teacher-banner">
            
                        <p className="Teacher-text">Are You EXPERT in Anything? 
                        <br/>Here is Your PATH..</p> 

                       <Link to="teacher"> <button className="createCourse">
                            Create New Course</button></Link>
                        
                    </div>
            );
        }

    

    return(
        <>
           
           {Banner}
            {text}

        </>
     


    );
  }
}

export default HomepageBanner;