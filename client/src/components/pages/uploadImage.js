import React, { Component } from 'react';
import axios from 'axios';
const BASE_URL = 'http://serverbrogrammers.herokuapp.com/routes/api/admins/';
 
class uploadImage extends Component {
constructor(props) {
super(props);
this.state = {
images: [],
imageUrls: [],
imageDataUrl:[],
message: ''
}
}
selectImages = (event) => {
let images = []
for (var i = 0; i < event.target.files.length; i++) {
images[i] = event.target.files.item(i);
}
images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
let message = `${images.length} valid image(s) selected`
this.setState({ images, message })
}
 
uploadImages = () => {
    var imgCanvas = document.createElement("canvas")
const uploaders = this.state.images.map(image => {
const data = new FormData();
data.append("image", image, image.name);

// Make an AJAX upload request using Axios
return axios.post(BASE_URL + 'uploadImage', data)
.then(response => {
this.setState({
imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
});
var imgAsDataURL = imgCanvas.toDataURL("image/png");

})
});
 
// Once all the files are uploaded 
axios.all(uploaders).then(() => {
console.log('done');
}).catch(err => alert(err.message));
}
 
render() {
return (
<div>
<br/>
<div className="col-sm-12">
<h1>{sessionStorage.getItem('lang')==='en'? 'Image uploader': 'تحميل الصوره'}</h1><hr/>
<div className="col-sm-4">
<input className="form-control " type="file" 
onChange={this.selectImages} multiple/>
</div>
<p className="text-info">{this.state.message}</p>
<br/><br/><br/>
<div className="col-sm-4">
<button className="btn btn-primary" value="Submit" 
onClick={this.uploadImages}>{sessionStorage.getItem('lang')==='en'? 'Submit': 'تم'}</button>
</div>
</div>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/><br/>
<div className="row col-lg-12">
{ 
this.state.imageUrls.map((url, i) => (
<div className="col-lg-2" key={i}>
<img src={BASE_URL + url} className="img-rounded img-responsive"
alt="not available"/><br/>
</div>
))
}
</div>
</div>
);
}
}
export default uploadImage;