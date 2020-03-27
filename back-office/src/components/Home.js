import React, { useState } from 'react';
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
import InputFileCustom from './inputFile'



function Home() {
const [visible,setVisible]=useState(false)
const [image,setImage]=useState()

var date = new Date(1544825952726); // pour simuler une date 


 var dataBooks = [
     {title:'Livre 1',author:'Victor Hugo',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e5fd3b2a2f6a844f031ec4e'},
     {title:'Livre 2',author:'Proust',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e7e010780fceb35e041b963'},
     {title:'Livre 3',author:'Bakounine',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e7e010980fceb35e041b964'},
     {title:'Livre 4',author:'Marc Levy',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:"5e7e010c80fceb35e041b965"}
    ]


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
function DateFormat(d){
    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var dateformat = `${day}/${month}/${year}`;
    return dateformat
    }
  


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
                    <p>Dernière modification :{DateFormat(book.lastModified)}</p>

                    <div style = {{flexDirection:'row',display:'flex', justifyContent:'space-between'}}>
                        <img src = {book.image} style = {{height:"200px",marginTop:'auto'}} />
                        
                        <Button type="primary" style = {{...buttonStyle}} ><Link to={`/openbook/${book.idBook}`}>Voir</Link></Button>
                    </div>
                </Card>   
            </Link>     
        </Col>
    )
    })



    // GESTION DE L'OVERLAY 
    const handleClickOverlayCreaBook = (bool)=>{
            setVisible(false)
    }

// RETURN GLOBAL
  return (
    <div style = {{backgroundImage: `url(${background})` }}>
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
}

export default Home;
