import React from 'react';
import { Link,Redirect } from "react-router-dom";
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import { Modal, Button,Card} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import OverlayForm from './Overlay-creaBook';
import Header from './Header'


function Home() {



var date = new Date(1544825952726); // pour simuler une date 


 var dataBooks = [
     {title:'Livre 1',author:'Victor Hugo',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e5fd3b2a2f6a844f031ebea'},
     {title:'Livre 2',author:'Proust',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e5fd3b2a2f6a844f031ec03'},
     {title:'Livre 3',author:'Bakounine',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:'5e5fd3b2a2f6a844f031ec03'},
     {title:'Livre 4',author:'Marc Levy',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:date,idBook:"5e5fd3b2a2f6a844f031ec35"}
    ]

// converti timestamp au format date dd/mm/yyyy
function DateFormat(d){
    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var dateformat = `${day}/${month}/${year}`;
    return dateformat
    }

    
var displayBooks = dataBooks.map((book, i) => {
    return (
        <Col xs="12" sm="4" md='3'style ={{margin:30}}>
            <Card title={book.title} style={{ width: 300}}>
                <p>Dernière modification :{DateFormat(book.lastModified)}</p>

                <div style = {{flexDirection:'row',display:'flex', justifyContent:''}}>
                    <img src = {book.image} style = {{height:"200px",marginTop:'auto'}} />
                    
                    <Button type="primary"  ><Link to={`/openbook/${book.idBook}`}>Voir</Link></Button>
                </div>

            </Card>        
        </Col>
    )
    })

  return (
    <div className="App">
        <Header/>
        
        <div style = {{display:'flex',flexDirection: 'column',justifyContent:'left'}}>
            <div style = {{height:200}}>
                <div style = {{width:'20%',fontSize:20}}>Tableau de bord</div>
            </div>
            <div style = {{display:'flex', flexDirection:'column'}}>
                <div style = {{fontSize:20, width:'20%'}}>Mes livres
                </div>
                <Button style = {{width:'20%', margin:30}} type="primary" onClick={()=> console.log('back in react') }>Ajouter un livre</Button>
                <Container>
                    <Row>
                        {displayBooks}
                    <OverlayForm/>
                    </Row>
                </Container>
            </div>
        </div>
    </div>
  );
}

export default Home;
