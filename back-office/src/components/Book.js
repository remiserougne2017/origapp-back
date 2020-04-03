import React, { useState,useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import '../App.css';
import { Tag, Button,Card,Switch} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'reactstrap';
import Header from './Header';
import color from './color';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import OverlayContent from './Overlay-creaContent'
import background from '../origami_background.jpg';
import {connect} from 'react-redux';
import OverlayForm from './Overlay-creaBook';

function Book(props) {


// STYLE VARIABLE

let mainTitleStyle = {
    fontSize:20, 
    textAlign:'left',
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
const [isPublished,setIsPublished] =useState()
const [isVisibleUpdateBook,setIsVisibleUpdateBook]= useState(false)
const [contentPublishedCount, setContentPublishedCount] =useState()
const [deleteBook,setDeleteBook]=useState(false)

var date = new Date(1544825952726); // pour simuler une date 


//function qui compte le nb de contenu publié
const toCountPublishedContent = ()=>{
    var count =0
    dataBook.contentData.map(e=>{
        if(e.contentStatus == true){
            count ++       };
    })
    console.log("nb de contenu publié",count)
    return count
}
    //Recalcule le nb de contenus publiés à chaque refresh de dataBook
    useEffect(()=>{
        setContentPublishedCount(toCountPublishedContent())
    },[dataBook])

//Function DELETE BOOK
const toDeleteBook = async (id)=>{
    var r = window.confirm("Etes-vous sûr de vouloir supprimer votre ouvrage? Cette action est définitive."); 
    if(r){
        var deleteBook = await fetch(`/bo/deleteBook/${id}`)
        var resp= await deleteBook.json()
        
        if(resp.result=='ok'){
            console.log("resp delete",resp)
            setDeleteBook(true)
            return <Redirect to="/Home"/>
        }else{
            console.log("resp delete else")
        }
    }
  
}
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
async function loadDataBook(bool,contentId,binContent) {
    var bookData = await fetch(`/bo/loadBook/${bool}/${contentId}/${binContent}`, { 
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `idBook=${props.match.params.idBook}`
          }
    );
    var bookDataJson = await bookData.json();
    setDataBook(bookDataJson.dataFromBack)
    setIsPublished(bookDataJson.dataFromBack.status) 
    }  


    //
useEffect( ()=> {
    setIdBook(props.match.params.idBook)
    console.log('usefeffect LOAD')
    loadDataBook();
  },[isVisible])
  
  //ecoute le changement IsPublished du book pour update la bdd
  useEffect( ()=> {
      if(isPublished){
// console.log("HOOK nb contenu publié",contentPublishedCount)
        var count = toCountPublishedContent()
        if(count==0||contentPublishedCount==0){
            alert("Impossible de publier un livre qui ne possède aucun contenu publié")
            setIsPublished(false)
        }else{
            loadDataBook(isPublished);
        }
      }else{
        loadDataBook(isPublished);
      }
  },[isPublished,contentPublishedCount])

//Gestion de la publication des contenus
const contentToPublish = (bool,content_id) => {
    loadDataBook(bool,content_id)
}


// gestion de l'overlay form content
const handleClickOverlayCreaContent = ()=>{
    setIsVisible(false)
// console.log('TIME OUT LOAD NEW CONTENT')
//     setTimeout(() => {
//         loadDataBook()
//     }, 1500);
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
        console.log("CREA BOOK")
        setTimeout(() => {
            loadDataBook(null);
          }, 3000);
        setIsVisibleUpdateBook(false)     
}
//Delete Content
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
        <Col xs="12" sm="6" lg="4" key={i}>
        <Card key={i} style={{ borderRadius:10,backgroundColor:'#ECF0F1',marginBottom:20}}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style = {{display:'flex',flexDirection:'row', justifyContent:'space-between',marginBottom:10,alignItems:'center'}}>
                    <div style = {{fontSize:16}}>{cont.contentTitle}</div>
                    <div style = {{display:'flex',flexDirection:'row'}}>
                        <div style={{marginRight:20}}>
                            {cont.contentStatus==true?'Publié':'Non publié'}</div>
                        <Switch checked={cont.contentStatus}  onChange={()=>{contentToPublish(!cont.contentStatus,cont.content_id)}} />
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
if(props.token==""){
    console.log("TOKEN 2 ?",props.token)
    return <Redirect to={"/"}/>
}else if(deleteBook){
    setDeleteBook(false)
    return <Redirect to='/Home'/>
}else{
  return (
    
    <div style={{width:"100%"}}>
        <OverlayForm visible={isVisibleUpdateBook} dataBook={dataBook} handleClickParent ={handleClickOverlayCreaBook}/>
        <Header/>
        <div style = {{marginLeft:10    }}>
            <Row style = {{display:'flex', flexDirection:'column', marginLeft:20, marginBottom:30}}>
                <Col xs='12'>
                    <div style = {{marginLeft:5,textAlign:'left'}}><Link to={`/Home`}>Retour</Link></div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                            <div style = {mainTitleStyle}>{dataBook.title}</div>
                            <div style = {{marginLeft:30}} >{displayTags}</div> 
                        </div>
                        <EditOutlined 
                                    style={{fontSize: 30,margin:10}}
                                    onClick = {()=> {setIsVisibleUpdateBook(true)}}
                            />
                        <DeleteOutlined style={{fontSize: 30,margin:10}} onClick={()=>{toDeleteBook(idBook)}}/>
                    </div> 
                    <div style = {{display:'flex', flexDirection:'column', marginLeft:30,marginTop:10}}> 
                        <div >{dataBook.authors}</div>
                        <div >{dataBook.illustrators}</div>
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
                <Button style = {{width:'20%', margin:15,padding:5}} type='primary' onClick={()=>{setIsVisible(true);setIdContent('new-content')}}>Ajouter un contenu</Button>
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
}}

function mapStateToProps(state) {
    return { token: state.token,
             publisher: state.publisher
     }
  }
  
  export default connect(mapStateToProps,null)(Book)
  