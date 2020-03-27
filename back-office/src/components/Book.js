import React, { useState,useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import { Tag, Button,Card,Icon,Switch} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';
import color from './color';
import { EyeOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import OverlayContent from './Overlay-creaContent'
import background from '../origami_background.jpg';
import Ip from './Ip'
import OverlayForm from './Overlay-creaBook';

function Book(props) {


// STYLE VARIABLE

let mainTitleStyle = {
    fontSize:20, 
    textAlign:'left',
    fontSize:40, 
    color: color('red'),
    padding:5, 
    paddingLeft:50 ,
    marginLeft:30,
    marginBottom:20,
    borderBottomColor:color('red'),
    borderBottomWidth:3,
    borderBottomStyle:'solid'        // backgroundColor:color('red')
}

let headerStyle = {
    fontSize:20,
    textAlign:'center',
    paddingBottom:10, 
    paddingTop:10,
    backgroundColor:color('red'),
    color:'white'
}


// routes to do : au chargement du composant fetch data book, toggle publier,

const [isVisible,setIsVisible] = useState(false);
const [dataBook,setDataBook] = useState({contentData:[],category:[]});
const [idContent,setIdContent] = useState('');
const [idBook,setIdBook] = useState(props.match.params.idBook)
const [isPublished,setIsPublished] =useState(dataBook.status)
const [isVisibleUpdateBook,setIsVisibleUpdateBook]= useState(false)
console.log(dataBook.status)

var date = new Date(1544825952726); // pour simuler une date 


// var dataBook = {
//     title : 'Livre 1',
//     author:'Proust',
//     status:true,
//     image:'https://res.cloudinary.com/dxkvzc4jc/image/upload/v1583511089/79114572_10218298487586791_8761985699067985920_o_a2xejb.jpg',
//     lastModified:DateFormat(date),
//     idBook:props.match.params.idBook,
//     category : ['jeunesse','histoire'],
//     views: 212,
//     contentNumber: 6,
//     rating: 4
// }


// load info from db
console.log(props.match.params.idBook)
async function loadDataBook(bool,contentId,binContent) {
    console.log("LOAD!",props.match.params.idBook)
    var bookData = await fetch(`/bo/loadBook/${bool}/${contentId}/${binContent}`, { 
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `idBook=${props.match.params.idBook}`
          }
    );
    var bookDataJson = await bookData.json();
    console.log("LOAD RETOUR BACK",bookDataJson)
    setDataBook(bookDataJson.dataFromBack)
    }  

useEffect( ()=> {
    setIdBook(props.match.params.idBook)
    loadDataBook();
  },[isVisible])

// gestion de l'overlay
const handleClickOverlayCreaContent = ()=>{
    console.log('hello handleclik')
    setIsVisible(false)
}


// converti timestamp au format date dd/mm/yyyy
function DateFormat(d){
    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var dateformat = `${day}/${month}/${year}`;
    return dateformat
    }
    

// gestion des tags
var displayTags = dataBook.category.map((tag, i) => {
    return (
    <Tag  key={i} color={color('red')} style ={{borderRadius:5}}>{tag.name}</Tag>
    )
    })


// GESTION DE L'OVERLAY Crea book
    const handleClickOverlayCreaBook = (bool)=>{
        setIsVisibleUpdateBook(false)
        loadDataBook();
}
//Delete OCntent
const deleteContent =(id)=>{
    var r = window.confirm("Etes-vous sûr de vouloir supprimer ce contenu? Cette action est définitive."); 
    if(r){
      console.log("ok alert");
      loadDataBook('undefined',id,true)
    }
}


// affichage des cards contenus
var displayContents = dataBook.contentData.map((cont, i) => {
    return (
        <Col xs='12' sm='4' key={i}>
        <Card key={i} style={{ borderRadius:10,backgroundColor:'#ECF0F1',marginBottom:20}}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style = {{display:'flex',flexDirection:'row', justifyContent:'space-between',marginBottom:10,alignItems:'center'}}>
                    <div style = {{fontSize:16}}>{cont.contentTitle}</div>
                    <div style = {{display:'flex',flexDirection:'row'}}>
                        <div style={{marginRight:20}}>
                            {cont.contentStatus==true?'Publié':'Non publié'}</div>
                        <Switch checked={cont.contentStatus}  onChange={()=>{console.log('switch!',!cont.contentStatus,cont.content_id);loadDataBook(!cont.contentStatus,cont.content_id)}} />
                    </div>  
                    {/* <Button type='primary'  >{JSON.stringify(cont.contentStatus)}</Button> */}
                </div>
                <div style = {{display:'flex',flexDirection:'row',marginBottom:10,alignItems:'center'}}>
                    <Tag color={color('blue')} style ={{borderRadius:5, width:60,marginRight:'auto'}}>page {cont.contentPage}</Tag>
                    <div style={{marginLeft:'auto'}}>
                        {/* <EyeOutlined style={{fontSize: 30,margin:10}}/> */}
                        <EditOutlined 
                            style={{fontSize: 30,margin:10}}
                            onClick = {()=> {setIdContent(cont.content_id);console.log('////// BOOK',cont.content_id);setIsVisible(true)}}
                            />
                        <DeleteOutlined style={{fontSize: 30,margin:10}} onClick={()=>{deleteContent(cont.content_id)}}/>
                    </div>
                </div> 
                <img src = {cont.contentImage} style = {{height:'300px',marginTop:'auto'}} />
            </div>
        </Card>        
    </Col>
        )
    })

// return  global 
  return (
    
    <div style = {{backgroundImage: `url(${background})` }}>
        <OverlayForm visible={isVisibleUpdateBook} dataBook={dataBook} handleClickParent ={handleClickOverlayCreaBook}/>
        <Header/>
        <div style = {{marginLeft:10    }}>
            <Row style = {{display:'flex', flexDirection:'column', marginLeft:20, marginBottom:30}}>
                <Col xs='12'>
                    <div style = {{marginLeft:5,textAlign:'left'}}><Link to={`/`}>Retour</Link></div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div style = {mainTitleStyle}>{dataBook.title}</div>
                        <EditOutlined 
                                    style={{fontSize: 30,margin:10}}
                                    onClick = {()=> {console.log('////// BOOK');setIsVisibleUpdateBook(true)}}
                            />
                    </div> 
                    <div style = {{display:'flex', flexDirection:'row', marginLeft:30,alignItems:'center'}}> 
                        <div style = {{fontSize:20,fontStyle:'italic',paddingRight:20}}>{dataBook.authors}</div>
                        <div >{displayTags}</div> 
                    </div>
                </Col>
            </Row>
            <Row style = {{display:'flex',width:'100%', flexDirection:'row',marginLeft:50,marginBottom:20}}>
                    <div style = {{display:'flex'}}>                            
                        <img src = {dataBook.coverImage} style = {{height:300}} />
                    </div>  
                    <div style = {{display:'flex',width:'40%',flexDirection:'column',height:300,backgroundColor:'white', borderRadius:10,borderColor:color('red'),borderWidth:1,borderStyle:'solid'}}>
                        <div style = {headerStyle}>Informations clés</div>
                        <div style = {{display:'flex',flexDirection:'row', justifyContent:'flex-end', margin:10}}>
                            <div style={{marginRight:10}}>Statut: {isPublished==true?'publié':'non publié'}</div>
                            {/* <Button type='primary'  >Publier/Dépublier</Button> */}
                            <Switch checked={isPublished}  onChange={()=>{setIsPublished(!isPublished)}} />
                        </div>
                        <div style = {{display:'flex', flexDirection:'column', textAlign:'left', marginLeft:20, fontSize:14}}>
                            <div style = {{marginBottom:20}}>Dernière modification : {dataBook.lastModified}</div>
                            <div>Nombre de vues  : {dataBook.views}</div>
                            <div>Nombre de content : {dataBook.contentNumber}</div>
                            <div>Notation lecteur : {Math.round(dataBook.rating*100)/100}</div>
                        </div>                  
                    </div>           
            </Row>
        </div>
        <div style = {{marginLeft:30}}>
            <Row style = {{display:'flex',flexDirection:'column',marginLeft:20}}>
                <div style = {mainTitleStyle}>Les contenus associés</div>
                <Button style = {{width:'20%', margin:30}} type='primary' onClick={()=>{setIsVisible(true);setIdContent('new-content')}}>Ajouter un contenu</Button>
            </Row>
        </div>
        <OverlayContent isVisible = {isVisible} handleClickParent ={handleClickOverlayCreaContent} idBook = {props.match.params.idBook} idContent = {idContent}/>
        <div style = {{marginLeft:30}}>
            <Row> 
                {displayContents}
            </Row>

        </div>
    </div>
  );
}

export default Book;
