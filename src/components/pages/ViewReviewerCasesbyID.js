import React ,{Component} from 'react';
import Postcard from '../cards/Postcard';

class ViewReviewerCasesbyID extends Component  {
    constructor(props)
    {
        super(props)
        this.state = 
        {   //id : this.params.id,
          companies:null,
          isLoadied:false
            
        }
    }
   
   componentDidMount()
   {
    fetch(`http://localhost:3000/api/reviewer/mycases/${this.props.id}`,{
    headers: new Headers({
        'x-access-token':this.props.token
  })})
    .then(response => response.json())
    .then(json => {
        this.setState({isLoadied : true ,
                        companies : json.data})});

   }

     // fetchUsers() {
     //   // Where we're fetching data from
     //   fetch('http://localhost:3000/api/lawyer/mycases/5ca8f1238d0a045048dde991')
     //     // We get the API response and receive data in JSON format...
     //     .then(response => response.json())
     //     // ...then we update the users state
     //     .then(data =>
     //       this.setState({
     //         companies: data,
     //         isLoading: false,
     //       })
     //     )
     //     // Catch any errors we hit and update the app
     //     .catch(error => this.setState({ error, isLoading: false }));
     // }
     // componentDidMount() {
     //   this.fetchUsers();
     // }
    render(){
    var{isLoadied , companies} = this.state
    if(!isLoadied)
        return <div> Loading ...</div>
        else{
  return (

        <div> 
            <ul>
                {companies.map((element,i)=>(
                    <Postcard key = {i} header = {element.nameInEnglish}title = {"helo"}  info = {element.investorName} func = {"Assign tasks"}/>
                 ) )}
          
          </ul>
          </div>
  
  )
        }
}
}
export default ViewReviewerCasesbyID;