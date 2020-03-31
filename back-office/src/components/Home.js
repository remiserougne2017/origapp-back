import React, { useState, useEffect } from 'react';
import { Link,Redirect } from "react-router-dom";
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import { Modal, Button,Card} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import OverlayForm from './Overlay-creaBook';
import Header from './Header';
import color from './color';
import background from '../origami_background.jpg';
import {connect} from 'react-redux';


function Home(props) {
   

   
const [visible,setVisible]=useState(false)
const [image,setImage]=useState()
// const [idPublisher,setIdPublisher] = useState(props.publisher);
const [dataBooks,setDataBooks] = useState([])
const [token,setToken]=useState(props.token)
var date = new Date(1544825952726); // pour simuler une date 



useEffect(()=>{
    console.log("TOKEN?",props.token)
   
    console.log("PUBLISHER?",props.publisher)
    const toLoadBooks = async ()=>{
        var books = await fetch(`/bo/home/${props.publisher}`)
        var resp=await books.json()
        console.log("RESP HOME",resp.dataBookHome)
        setDataBooks(resp.dataBookHome)
    };
    toLoadBooks()
},[props.publisher])

//  var dataBooks = [
//      {title:'Livre 1',authors:'Victor Hugo',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e5fd3b2a2f6a844f031ec4e'},
//      {title:'Livre 2',authors:'Proust',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e7e010780fceb35e041b963'},
//      {title:'Livre 3',authors:'Bakounine',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e7e010980fceb35e041b964'},
//      {title:'Livre 4',authors:'Marc Levy',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:"5e7e010c80fceb35e041b965"}
//     ]


    // STYLE VARIABLES: 

    let mainTitleStyle = {
        fontSize:20, 
        textAlign:'left',
        fontSize:40, 
        color: color('red'),
        padding:5, 
        paddingLeft:50 ,
        marginLeft:30,
        marginBottom:40,
        borderBottomColor:color('red'),
        borderBottomWidth:3,
        borderBottomStyle:'solid'        // backgroundColor:color('red')
    }
        
    let buttonStyle = {
        backgroundColor:color('blue'),
        borderColor:color('blue')
    
    
    }

// converti timestamp au format date dd/mm/yyyy
// function DateFormat(d){
//     var day = d.getDate();
//     var month = d.getMonth()+1;
//     var year = d.getFullYear();
//     var dateformat = `${day}/${month}/${year}`;
//     return dateformat
//     }
  


// GENERE LA LISTE DES CARDS

var displayBooks = dataBooks.map((book, i) => {
    return (
        <Col  key={i} xs="12" sm="4" >
            <Link  key={i}
                to={`/openbook/${book.idBook}`}
                style={{ textDecoration: 'none' }}
                >
                <Card key={i} title={book.title} 
                    style = {{marginBottom:20,borderRadius:10}}
                    hoverable = {true}
                    headStyle = {{backgroundColor:color('red'),color:'white'}}>
                    {/* <p>Dernière modification :{DateFormat(book.lastModified)}</p> */}

                    <div style = {{flexDirection:'row',display:'flex', justifyContent:'space-between'}}>
                        <img src = {book.image} style = {{height:"200px",marginTop:'auto'}} />
                        
                        <Button type="primary" style = {{...buttonStyle}} ><Link to={`/openbook/${book.idBook}`}>Voir</Link></Button>
                    </div>
                </Card>   
            </Link>     
        </Col>
    )
    })



    // GESTION DE L'OVERLAY  CREABOOK
    const handleClickOverlayCreaBook = (bool)=>{
            setVisible(false)
            //recharger la page pour afficher les modifs
    }

// RETURN GLOBAL
if(props.token==""){
    console.log("TOKEN 2 ?",props.token)
    return <Redirect to={"/"}/>
}else{
  return (
    <div style = {{backgroundImage: `url(${background})`, height:'100vh'}}>
        <Header/>
        {/* <InputFileCustom></InputFileCustom> */}
        <div style = {{display:'flex',flexDirection: 'column',justifyContent:'left'}}>
            <div style = {{height:200}}>
                <div style = {mainTitleStyle}>Tableau de bord</div>
            </div>
            <div style = {{display:'flex', flexDirection:'column'}}>
                <div style = {mainTitleStyle}>Mes livres
                </div>
                <div style = {{marginLeft:30}}>
                    <Button style = {{width:'20%',marginTop:20, marginBottom:60,height:50, ...buttonStyle}} type="primary" onClick={()=>{setVisible(true)}}>Ajouter un livre</Button>
                    <Row>
                        {displayBooks}
                    <OverlayForm visible={visible} handleClickParent ={handleClickOverlayCreaBook}/>
                    {/* <CreaBookOverlay2 visible={visible} handleClickParent ={handleClickOverlayCreaBook}/> */}
                    </Row>
                </div>
            </div>
        </div>
    </div>
  );
}}

function mapStateToProps(state) {
  return { token: state.token,
           publisher: state.publisher
   }
}

export default connect(mapStateToProps,null)(Home)
