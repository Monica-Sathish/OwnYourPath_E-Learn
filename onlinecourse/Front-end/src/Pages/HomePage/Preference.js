import React, {Component } from 'react';
import './CSS/Preference.css';
import axios from '../../ApiServices/axiosUrl';
import CourseTitle from './CourseTitle';
import { Redirect } from 'react-router-dom';
import Alert from '../Auth/Forms/alert'
import Layout from '../../components/Layout/Layout';

class Preference extends Component {

    state = {
        interest:[],
        userId:localStorage.getItem('userId'),

        Courses: {
            "Web Development":{
                touched:false,
            },
            "Programming Languages":{
                touched:false,
            },
            "AI / ML":{
                touched:false,
            },
            "Cloud Development":{
                touched:false,
            },
            "Data Science":{
                touched:false,
            },
        },
        redirect:null,
        alert: {
            valid:false,
            msg:"",
            alertType:"",
        },

        alertPressed:false,
        token:localStorage.getItem('user'),
    }



AlertError(alertmsg, alertType) {
    const AlertArray = {...this.state.alert};
    AlertArray.msg = alertmsg;
    AlertArray.valid=true;
    AlertArray.alertType=alertType;
    this.setState({alert:AlertArray});

}



    categoryHandler=(CourseName)=>{


            if(this.state.Courses[CourseName].touched)

            {   const UpdatedCourses = {...this.state.Courses};
                UpdatedCourses[CourseName].touched=false;

                this.setState({Courses:UpdatedCourses})
                const index =this.state.interest.indexOf(CourseName);
                if(index >-1) this.state.interest.splice(index,1);
            }

            else
            {const UpdatedCourses = {...this.state.Courses};
            UpdatedCourses[CourseName].touched=true;
            


            this.setState({Courses:UpdatedCourses})
            this.state.interest.push(CourseName);}
        
        
        this.setState(prevState => 
            ({interest:prevState.interest, Courses:prevState.Courses}));

        console.log(this.state.interest)

    }

    sumbitHandler =()=> {
      
       // const fd =new FormData();
        const formData = {"interest":this.state.interest, 'userId':this.state.userId};
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 3000);
      
        console.log(formData);

        //fd.append("userId",this.state.userId);
       //fd.append("interest",this.state.interest);

        
        axios.post("/home/interests/",formData, {
            headers: {
                
               Authorization: 'Bearer '+ this.state.token + " " + localStorage.getItem('ref_token')
                
            }
        })
        .then(response => {
            
                console.log("Preference Added");    
                this.AlertError("Preferences Added", "success");
                this.setState({redirect:'/home/preferences'})


        })
        .catch(error => {
            console.log(error.response);
            if(error.response.statusText  === "Internal Server Error"){
                this.setState({redirect:'/login'})
            }
        })


    }


    render(){

        let alertContent = null;


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
  

            var webdev ,ml, cd, ds,pl;

            if(this.state.Courses["Web Development"].touched){
                webdev = ['touched']
            }
            else{
                webdev=['']
            }

            if(this.state.Courses["Programming Languages"].touched){
                pl = ['touched']
            }
            else{
                pl = ['']
            }

            if(this.state.Courses["Cloud Development"].touched){
                cd = ['touched']
            }
            else{
                cd=['']
            }
            
            if(this.state.Courses["Data Science"].touched){
                ds = ['touched']
            }
            else{
                ds=['']
            }

            if(this.state.Courses["AI / ML"].touched){
                ml = ['touched']
            }
            else{
                ml=['']
            }
            

            if(this.state.alert.valid){

                alertContent = ( <Alert value={this.state.alertPressed}         
                                         alertMsg ={this.state.alert.msg} 
                                        alertType={this.state.alert.alertType} /> )
            }
          
        
        return(


        <Layout>
         
            <div className="container">
                     {alertContent}
                <div className="title">
                     <CourseTitle welcomeMessage ={"Choose Your interests,"}/>
                </div>
                <div className="Preference-buttons">

                    <button className={webdev.join(' ')} onClick={()=> this.categoryHandler("Web Development")}>Web Development</button>
                    <button className={pl.join(' ')} onClick={()=> this.categoryHandler("Programming Languages")}>Programming Languages</button>
                    <button className={ml.join(' ')} onClick={()=> this.categoryHandler("AI / ML")}>AI / ML</button>
                    <button className={cd.join(' ')} onClick={()=> this.categoryHandler("Cloud Development")}>Cloud Development</button>
                    <button className={ds.join(' ')} onClick={()=> this.categoryHandler("Data Science")}> Data Science</button>
                    
                </div>


            <div className="SumbitBtn">
                    <button  onClick={this.sumbitHandler}>SUMBIT</button>
                </div>


            </div>
        </Layout>
            
        );
    }



}

export default Preference;