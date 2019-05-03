import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import NotRequired from "../inputs/NotRequired";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../snackbar/Snackbar"
import jsPDF from 'jspdf'
import FileUploader from "react-firebase-file-uploader";
import html2canvas from 'html2canvas'
import img3 from '../../../components/Images/capture.png'
import firebase from '../../../firebase';
window.html2canvas=html2canvas

const storage = firebase.storage();

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class FormDialogue2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      width: "100%",
      success:false,
      company: {
        regulationLaw: "",
        legalCompanyForm: "",
        nameInArabic: "",
        nameInEnglish: "",
        governerateHQ: "",
        cityHQ: "",
        addressHQ: "",
        telephoneHQ: "",
        faxHQ: "",
        capitalCurrency: "",
        capital: "",
        lawyer: "",
        lawyerComment: "",
        reviewer: "",
        reviewerComment: "",
        managers: [
          {
           
            name: "",
            type: "",
            sex: "",
            nationality: "",
            identificationType: "",
            identificationNumber: "",
            birthDate: "",
            address: "",
            managerialPosition: ""
          }
        ]
      },
      id:'',
      investorName:'',
      investorAddress:'',
      investorBD:'5/5/1992',
      investorIdentificationNumber:'',
      investorIdentificationType:'',
      investorNationality:'',
      egp:'none',
      negp:'block',
      vis:'none',
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createPdf=this.createPdf.bind(this)
  }
  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === "" || obj[propName] === undefined || obj[propName]===[]) {
        delete obj[propName];
      }
    }
  };

  createPdf(e){
    this.setState({
      vis:"block"
    })
    e.preventDefault();

    var source = document.getElementById('com');
    var source2 = document.getElementById('com2');
    var source3 = document.getElementById('com3');
    var doc=''
    var blob=''
    var id=this.state.id
        html2canvas(source,{
          dpi: 144,
          scale:0.9
        }).then(function(canvas) {
          var img = canvas.toDataURL('image/png');
          var doc = new jsPDF();
          doc.addImage(img, 'JPEG', 17, 10);
          doc.addPage();
          html2canvas(source2,{
            dpi: 144,
            scale:0.9
          }).then(function(canvas) {
            img = canvas.toDataURL('image2/png');
            doc.addImage(img, 'JPEG', 17, 10);
            doc.addPage()
            html2canvas(source3,{
              dpi: 144,
              scale:0.9
            }).then(function(canvas) {
              img = canvas.toDataURL('image3/png');
              doc.addImage(img, 'JPEG', 17, 10);
               var image= doc.output('blob')
             // document.location.href = '/profile';
             const uploadTask = storage.ref(`${id}/pdf`).put(image);
             uploadTask.on('state_changed', 
             (snapshot) => {
               // progrss function ....
               const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
             }, 
             (error) => {
                  // error function ....
               console.log(error);
             }, 
           () => {
               // complete function ....
               storage.ref(id).child('pdf').getDownloadURL().then(url => {
                   console.log(url);
                   window.open(url,'_blank');
                  
               })
           });
            })
    
           
          })
          
      })
     
      

  };

  handleSubmit(e) {
    e.preventDefault();
    let userData = this.state.company;

    this.clean(userData);
    console.log(userData)
console.log(this.props.id)
    fetch(`http://serverbrogrammers.herokuapp.com/api/lawyer/editForm/${sessionStorage.getItem("ssn")}/${this.props.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.token
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful' + data.data)


this.setState({
id:data.data._id,
investorName:data.data.investorName,
investorAddress:data.data.investorAddress,
investorIdentificationNumber:data.data.investorIdentificationNumber,
investorIdentificationType:data.data.investorIdentificationType,
investorNationality:data.data.investorNationality
})
if(data.data.capitalCurrency=='egp'){
  document.getElementById("negp").style.visibility = "hidden";
}else{
  document.getElementById("egp").style.visibility = "hidden";
}
try{
this.createPdf(e).then(()=>{
this.setState({success:true})
this.forceUpdate()});}
catch{
  console.log("the server is too slow")
}
        
       
        //window.location.reload(); 
      });
    })
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleInput = props => {
    return Object.keys(props.data).map(key => [key, props.data[key]][0]);
  };
  handleInputval = props => {
    return Object.keys(props.data).map(key => [key, props.data[key]][1]);
  };
  handleInputs=(e)=> {
    let value = e.target.value;
    let name = e.target.name;
    // console.log(this.state.investor)
    this.setState(
      prevState => {
        return {
          company: {
            ...prevState.company,
            [name]: value
          }
        };
      },
      () => console.log(this.state.company)
    );
  }
  render() {
  
    
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>Edit</MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {" "}
          <Grid container direction="column" alignItems="center">
            <DialogTitle id="form-dialog-title">Form Resubmission</DialogTitle>
          </Grid>
          <DialogContent>
            <DialogContentText>
              This form has been commented on and rejected by the reviewer, please
              edit the required fields to proceed.
            </DialogContentText>

            {this.handleInput(this.props).map((input, i) =>
              input !== "status" &&
              input !== "_id" &&
              input !== "__v" &&
              input !== "lawyer" &&
              input !== "lawyerComment" &&
              input !== 'reviewer'&&
              input !== 'reviewerComment'
              ? (
                <Grid container direction="column" alignItems="center">
                  <NotRequired
                    name={input}
                    field={input}
                    type="text"
                    callBack={this.handleInputs}
                  />
                </Grid>
              ) : (
                console.log()
                )
                )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={event => {
                this.handleSubmit(event);
                this.handleClose();
              }}
              color="primary"
            >
              Submit
          
            </Button>
           
          </DialogActions>
        </Dialog>


        <div style={{  display: this.state.vis }}>

<div id="com" dir="rtl" lang='ar'  align='right'>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
<img src={img3} width={160} height={133} mode="fill" />
<h4 align='center' styles={{}}>النظام الأساسي</h4>
<h4 align='center'>  لشركة {this.state.company.nameInArabic} {this.state.company.nameInEnglish}</h4>
<h4 align='center'>شركة شخص واحد</h4>
<h4 align='center'>خاضعة لأحكام قانون شركات المساھمة وشركات التوصیة بالأسھم والشركات ذات المسئولیة المحدودة وشركات
الشخص الواحد الصادر بالقانون رقم ١٥٩ لسنة ١٩٨١</h4>
<h4 align='center'>  رقم العقد  {this.state.id}  </h4>
<p> إنه في یوم الثلاثاء الموافق ٢٠١٩/٠٥/٠ تم إقرار ھذا النظام الأساسي وفقا للمواد الآتیة </p>
<h4 align='center'><u><b>تمهيد</b></u></h4>
<p> في اطار أحكام القانون المصري وافق الموقع على هذا النظام الأساسي على تأسيس شركة شخص واحد تحت اسم   {this.state.company.nameInArabic} وتأسيساً على ذلك تقدم بهذا النظام الأساسي إلى الهيئة العامة للاستثمار والمناطق الحرة ، حيث قامت بإجراء المراجعة اللازمة له. </p>
<p>ويقر الموقع على هذا النظام الأساسي بأنه قد توافرت فيه الأهلية اللازمة لتأسيس شركة شخص واحد ، وبأنه لم يسبق صدور أحكام عليه بعقوبة جناية أو جنحة مخلة بالشرف أو الأمانة أو بعقوبة من العقوبات المُشار إليها في المواد (89)، (162)، (163)، (164) من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة وشركات الشخص الواحد الصادر بالقانون رقم 159 لسنة 1981 ، ويشار إليه فيما بعد باسم "قانون الشركات" ، ما لم يكن قد رُد إليه اعتباره ، وأنه غير محظور عليه تأسيس شركات طبقاً لأحكام القانون .</p>
<p>كما يقر أنه لم يقدم أو يساهم أو يستخدم في إنشاء أو تأسيس أو إقامة مشروع الاستثمار المتمتع بالحافز أياً من الأصول المادية لشركة أو منشأة قائمة وقت العمل بأحكام هذا القانون أو قام بتصفية تلك الشركة أو المنشأة خلال المدة المبينة بالبند (2) من المادة (12) من اللائحة التنفيذية لقانون الاستثمار بغرض إنشاء مشروع استثماري جديد يتمتع بالحوافز الخاصة المشار إليها ، ويترتب على مخالفة ذلك سقوط التمتع بالحافز المشار إليه والتزام الشركة بسداد جميع المستحقات الضريبية .</p>
<p>وقد وافق على تأسيس شركة شخص واحد مصرية الجنسية وفقاً لأحكام القوانين النافذة وعلى وجه الخصوص قانون الشركات ولائحته التنفيذية وقانون الاستثمار الصادر بالقانون رقم 72 لسنة 2017 ، ويشار إليه فيما بعد باسم "قانون الاستثمار" ولائحته التنفيذية وأحكام هذا النظام الأساسي.</p>
<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ١ )</h4>
<p>اسم الشركة: {this.state.company.nameInEnglish} {this.state.company.nameInArabic} شركة شخص واحد ذات مسئولية محدودة</p>

<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٢ )</h4>
<p>بیانات مؤسس الشركة</p>
<table align='center' style={{border: '1px solid black',width:"85%"}}>
<tr style={{border: '1px solid black'}}>
<th style={{border: '1px solid black'}}>
الاسم
</th>
<th style={{border: '1px solid black'}}>
الجنسیة
</th>
<th style={{border: '1px solid black'}}>
تاریخ المیلاد
</th>
<th style={{border: '1px solid black'}}>
إثبات الشخصیة
</th>
<th style={{border: '1px solid black'}}>
الإقامة
</th>
</tr>
<tr style={{border: '1px solid black',width:"70%"}}>
<td style={{border: '1px solid black'}}>
{this.state.investorName}
</td>
<td style={{border: '1px solid black'}}>
{this.state.investorNationality}
</td>
<td style={{border: '1px solid black'}}>
{this.state.investorBD}    </td>
<td style={{border: '1px solid black'}}>
{this.state.investorIdentificationType} {this.state.investorIdentificationNumber}   </td>
<td style={{border: '1px solid black'}}>
{this.state.investorAddress}
</td>

</tr>
</table>


</div>

<div id="com2" dir="rtl" lang='ar'  align='right' >
<img src={img3} width={160} height={133} mode="fill" />

<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٣ )</h4>
<p>یكون المركز الرئیسى لإدارة الشركة ومحلھا القانوني في العنوان الآتى  :{this.state.company.addressHQ} </p>
<p>مع مراعاة القانون رقم ١٤ لسنة ٢٠١٢ بشأن التنمیة المتكاملة في شبھ جزیرة سیناء ، لمدیر الشركة إنشاء فروع أو وكالات لھا داخل
جمھوریة مصر العربیة أو خارجھا ، وللشركة أن تقرر نقل المركز الرئیسي لھا إلى أي مدینة أخرى داخل جمھوریة مصر العربیة
بموافقة مؤسس أو مالك الشركة .</p>


<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٤ )</h4>


<p>حدد رأسمال الشركة بمبلغ{this.state.company.capital} ){this.state.company.capitalCurrency}( وقد أودع رأسمال الشركة بالكامل في البنك بموجب الشهادة المرفقة.</p>

<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٥ )</h4>

<p>يجوز زيادة رأس مال الشركة على دفعة واحدة أو أكثر ، سواء بإصدار حصص جديدة أو بتحويل المال الاحتياطي إلى حصص ، وذلك بقرار من مؤسس أو مالك الشركة وطبقا للأحكام المنصوص عليها في قانون الشركات.</p>

<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٦ )</h4>


<p >
لمؤسس أو مالك الشركة أن يقرر تخفيض رأس مال الشركة لأي سبب ، سواء عن طريق إنقاص عدد الحصص أو تخفيض القيمة الاسمية لكل منها ، وفقاً لأحكام قانون الشركات ولائحته التنفيذية .
</p>
<p id="egp">
ولا يجوز تخفيض رأس المال إلى أقل من خمسين ألف جنيه .
</p>

<p id="negp">
ولا يجوز تخفيض رأس المال إلى أقل من ما يعادل خمسين ألف جنيه .    </p>




<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٧ )</h4>

<p>يتولى إدارة الشركة مؤسس الشركة أو مدير أو أكثر يعينهم مؤسس الشركة على النحو التالي</p>


<table align='center' style={{border: '1px solid black',width:"85%"}}>
<tr style={{border: '1px solid black'}}>
<th style={{border: '1px solid black'}}>
الاسم
</th>
<th style={{border: '1px solid black'}}>
الجنسیة
</th>
<th style={{border: '1px solid black'}}>
تاریخ المیلاد
</th>
<th style={{border: '1px solid black'}}>
إثبات الشخصیة
</th>
<th style={{border: '1px solid black'}}>
الإقامة
</th>
</tr>
<tr style={{border: '1px solid black',width:"70%"}}>
<td style={{border: '1px solid black'}}>
{this.state.investorName}
</td>
<td style={{border: '1px solid black'}}>
{this.state.investorNationality}
</td>
<td style={{border: '1px solid black'}}>
{this.state.investorBD}    </td>
<td style={{border: '1px solid black'}}>
{this.state.investorIdentificationType} {this.state.investorIdentificationNumber}   </td>
<td style={{border: '1px solid black'}}>
{this.state.investorAddress}
</td>

</tr>
</table>
<p>
و يباشر المديرون وظائفهم لمدة غير محددة
</p>
<p>
ويسرى في شأن مدير الشركة حكم المادة (89) من قانون الشركات ، مع مراعاة ألا يكون غير محظور عليه إدارة الشركات طبقاً لأحكام القانون .
</p>
<p>
ولا يجوز للمدير أن يتولى إدارة شركة أخرى أياً كان نوعها إذا كانت تعمل في ذات النشاط الذي تزاوله الشركة أو أحد فروعها ، كما لا يجوز له أن يتعاقد مع الشركة التي يتولى إدارتها لحسابه أو لحساب غيره ، أو يمارس لحساب الغير نشاطاً من نوع النشاط الذى تزاوله الشركة .
</p>

</div>

<div id="com3" dir="rtl" lang='ar'  align='right'>
<img src={img3} width={160} height={133} mode="fill" />

<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٨ )</h4>
<p>تسري على الشركة أحكام قانون الشركات ولائحته التنفيذية فيما لم يرد بشأنه نص خاص في هذا النظام .</p>

<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ٩ )</h4>
<p>ينشر هذا النظام طبقا لأحكام القانون .</p>


<h4 align='center'style={{textDecoration:'underline'}}> الماده ( ١٠ )</h4>
<p>قام مؤسس الشركة بشخصه باتخاذ كافة الإجراءات اللازمة في هذا الشأن .</p>
<p>وتلتزم الشركة بأداء المصروفات والنفقات والأجور والتكاليف التي تم انفاقها بسبب تأسيس الشركة ، وذلك خصماً من حساب المصروفات العامة.</p>
</div>

</div>

      </div>
    );
  }
}
export default withStyles(styles)(FormDialogue2);
