import React from 'react';
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import { Modal, Button,Card} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import OverlayForm from './Overlay-creaBook'

function Home() {

 var dataBooks = [
     {title:'Le Ara de Rosa',author:'Victor Hugo',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:1584025573},
     {title:'Bonjour Paris',author:'Victor Hugo',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:1584025573},
     {title:'Le Ara de Rosa',author:'Victor Hugo',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:1584025573},
     {title:'Bonjour Paris',author:'Victor Hugo',status:true,image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',lastModified:1584025573}
    ]

    
var displayBooks = dataBooks.map((book, i) => {
    return (
        <Col xs="12" sm="4" md='3'style ={{margin:30}}>
            <Card title={book.title} style={{ width: 300}}>
                <p>Dernière modification :{book.lastModified}</p>

                <div style = {{flexDirection:'row',display:'flex', justifyContent:''}}>
                    <img src = {book.image} style = {{height:"200px",marginTop:'auto'}} />
                    <Button type="primary" onClick={()=> console.log('back in react') }>Ajouter un livre</Button>
                </div>

            </Card>        
        </Col>
    )
    })

  return (
    <div className="App">
        <div style = {{display:'flex',flexDirection:'row'}}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Origapp
            </p>
        </div>
        <div>
            <div>Tableau de bord</div>
        </div>
        <div>
            <div>Mes livres
            </div>
            <Button type="primary" onClick={()=> console.log('back in react') }>Ajouter un livre</Button>
            <Container>
                <Row>
                    {displayBooks}
                <OverlayForm/>
                </Row>
            </Container>
        </div>
    </div>
  );
}

export default Home;
