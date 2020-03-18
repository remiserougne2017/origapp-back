import React from 'react';
import { Link,Redirect } from "react-router-dom";
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import { Tag, Button,Card,Icon} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';
import color from './color';
import { EyeOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import OverlayContent from './Overlay-creaContent'


function Book(props) {
// routes to do : au chargement du composant fetch data book, toggle publier,


var date = new Date(1544825952726); // pour simuler une date 


var dataBook = {
    title : 'Livre 1',
    author:'Proust',
    status:true,
    image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',
    lastModified:DateFormat(date),
    idBook:props.match.params.idBook,
    category : ['jeunesse','histoire'],
    views: 212,
    contentNumber: 6,
    rating: 4
}

// converti timestamp au format date dd/mm/yyyy
function DateFormat(d){
    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var dateformat = `${day}/${month}/${year}`;
    return dateformat
    }

    


var displayTags = dataBook.category.map((tag, i) => {
    return (
    <Tag color={color('red')} style ={{borderRadius:5}}>{tag}</Tag>
    )
    })

  return (
    <Container>
        <Header/>
        <div style = {{marginLeft:10    }}>
            <Row style = {{display:'flex', flexDirection:'column', marginLeft:20, marginBottom:30}}>
                <Col xs="12" sm="6">
                    <div style = {{marginLeft:5,textAlign:'left'}}><Link to={`/`}>Retour</Link></div>
                    <div style = {{textAlign:'left',fontSize:44, color: color('red')}}>{dataBook.title}</div>
                    <div style = {{textAlign:'left',fontSize:14,fontStyle:'italic',marginBottom:20}}>{dataBook.author}</div>
                    <div style = {{textAlign:'left'}}>{displayTags}</div> 
                </Col>
            </Row>
            <Row style = {{display:'flex', flexDirection:'row', marginRight:'auto'}}>
                <Col xs="12" sm="4">
                    <img src = {dataBook.image} style = {{height:300,margin:20}} />
                </Col>
                <Col xs="12" sm="6">
                    <div style = {{display:'flex',flexDirection:'column',height:200, witdh:'40%', backgroundColor:'#ECF0F1',margin:20, borderRadius:10}}>
                        <div style = {{display:'flex',flexDirection:'row', justifyContent:'space-around', margin:10}}>
                            <div>Statut: Publié {dataBook.status}</div>
                            <Button type="primary"  >Publier/Dépublier</Button>
                        </div>
                        <div style = {{display:'flex', flexDirection:'column', textAlign:'left', marginLeft:20, fontSize:14}}>
                            <div style = {{marginBottom:20}}>Dernière modification : {dataBook.lastModified}</div>
                            <div>Nombre de vues  : {dataBook.views}</div>
                            <div>Nombre de content : {dataBook.contentNumber}</div>
                            <div>Notation lecteur : {dataBook.rating}</div>
                        </div>                  
                    </div>
                </Col>             
            </Row>
        </div>
        <div style = {{marginLeft:30}}>
            <Row style = {{display:'flex',flexDirection:'column',marginLeft:20}}>
                <div style = {{textAlign:'left',fontSize:44, color: color('red')}}>Les contenus associés</div>
                <Button style = {{width:'20%', margin:30}} type="primary" onClick={()=>{console.log('back in react')}}>Ajouter un contenu</Button>
            </Row>
        </div>
        <OverlayContent/>
        <div style = {{marginLeft:30}}>
            <Row> 
                <Col xs="12" sm='6'>
                    <Card style={{ borderRadius:10,backgroundColor:'#ECF0F1',marginBottom:20}}>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div style = {{display:'flex',flexDirection:'row', justifyContent:'space-between',marginBottom:10,alignItems:'center'}}>
                                <div style = {{fontSize:16}}>Nom du contenu</div>
                                <Button type="primary"  >Publier</Button>
                            </div>
                            <div style = {{display:'flex',flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                                <Tag color={color('blue')} style ={{borderRadius:5, width:60,marginRight:'auto'}}>page 3</Tag>
                                <div style={{marginLeft:'auto'}}>
                                    <EyeOutlined style={{fontSize: 30,margin:10}}/>
                                    <EditOutlined style={{fontSize: 30,margin:10}}/>
                                    <DeleteOutlined style={{fontSize: 30,margin:10}}/>
                                </div>
                            </div> 
                            <img src = {dataBook.image} style = {{height:"300px",marginTop:'auto'}} />
                        </div>
                    </Card>        
                </Col>    
            </Row>

        </div>
    </Container>
  );
}

export default Book;
