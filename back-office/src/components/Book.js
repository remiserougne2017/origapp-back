import React from 'react';
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import { Tag, Button} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header'


function Book(props) {



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
        <Tag color="#f50">{tag}</Tag>
        )
        })

  return (
    <div className="App">
        <Header/>
        <div style = {{display:'flex', flexDirection:'column', marginLeft:20}}>
            <div style = {{display:'flex', flexDirection:'row', alignItems:'center'}} >
                <div style = {{marginRight:20}}>Retour</div>
                <div style = {{fontSize:44}}>{dataBook.title}</div>

                {/* <Icon type="delete" key="ellipsis" style = {{cursor:"pointer"}} />, */}
            </div>
            <div>{dataBook.author}</div>
            <div>{displayTags}</div> 
        </div>
        <div style = {{display:'flex', flexDirection:'row'}}  >
            <img src = {dataBook.image} style = {{height:"200px",margin:20}} />
            <div style = {{display:'flex',flexDirection:'column', backgroundColor:'#ECF0F1',margin:20, borderRadius:10}}>
                <div style = {{display:'flex',flexDirection:'row'}}>
                    <div>Statut: {dataBook.status}</div>
                    <Button type="primary"  >Publier/Dépublier</Button>
                </div>
                <div style = {{display:'flex', flexDirection:'column'}}>
                    <div>Dernière modification : {dataBook.lastModified}</div>
                    <div>Nombre de vues  : {dataBook.views}</div>
                    <div>Nombre de content : {dataBook.contentNumber}</div>
                    <div>Notation lecteur : {dataBook.rating}</div>
                </div>
                

            </div>

            
        </div>
    </div>
  );
}

export default Book;
