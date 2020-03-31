export default function(publisher = '', action){
    if(action.type == 'addPublisher'){
        console.log('reducer add TOKEn')
        return action.publisher
    } else if (action.type == 'deletePublisher'){
        console.log('reducer delete publisher SURE');
        var newPublisher = "";
        console.log('new publisher ?',newPublisher)
        return newPublisher
    } else {
        return publisher
    }
}
