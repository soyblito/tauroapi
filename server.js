const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const config = require("./config/auth.config.js");
const checker = require("./middleware/checktoken");
/*
const firebase = require('firebase'); 

const firebaseConfig = {
  apiKey: "AIzaSyCf4zvSZwlzjxTWIltpWkabt8847E1UV8w",
  authDomain: "apigluck.firebaseapp.com",
  databaseURL: "https://apigluck.firebaseio.com",
  projectId: "apigluck",
  storageBucket: "apigluck.appspot.com",
  messagingSenderId: "1047675661737",
  appId: "1:1047675661737:web:05dcf1f7dd8771d878a8b8",
  measurementId: "G-CPP46ZVPYL"
};

firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage().ref('pictures/test.jpg');
*/
//const jsftp = require("jsftp");
//const {SocksClient} = require('socks');

// const ftp = new jsftp({
//   host: "ftp.laescueladevalores.com.ar",
//   port: 21,  
//   user: "laescueladevalores",  
//   pass: "lasegunda2015"  
// });
/*
var FTPS = require('ftps');
var ftps = new FTPS({
  host: 'ps618847.dreamhost.com', // required
  username: 'apigluck', // Optional. Use empty username for anonymous access.
  password: '6WgSmWe9', // Required if username is not empty, except when requiresPassword: false
  protocol: 'sftp', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
  // protocol is added on beginning of host, ex : sftp://domain.com in this case
  port: 22, // Optional
  // port is added to the end of the host, ex: sftp://domain.com:22 in this case
  escape: true, // optional, used for escaping shell characters (space, $, etc.), default: true
  retries: 2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
  timeout: 10, // Optional, Time before failing a connection attempt. Defaults to 10
  retryInterval: 5, // Optional, Time in seconds between attempts. Defaults to 5
  retryMultiplier: 1, // Optional, Multiplier by which retryInterval is multiplied each time new attempt fails. Defaults to 1
  requiresPassword: true, // Optional, defaults to true
  autoConfirm: true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false
  cwd: '', // Optional, defaults to the directory from where the script is executed
  additionalLftpCommands: '', // Additional commands to pass to lftp, splitted by ';'
  //requireSSHKey:  true, //  Optional, defaults to false, This option for SFTP Protocol with ssh key authentication
  //sshKeyPath: '/home1/phrasee/id_dsa' // Required if requireSSHKey: true , defaults to empty string, This option for SFTP Protocol with ssh key authentication
});
// Do some amazing things
//ftps.cd('./');
ftps.ls().exec(function(err, res){
  if(err || res.error){
    console.log('-------- error');
    return console.log('Error getting file list:', (err || res.error));
  }
  console.log('------- response: ' + res);
   
});
*/
// const ftp_ = new Ffp({
//   host: "c1720515.ferozo.com",
//   port: 21,  
//   user: "c1720515",  
//   pass: "Glfufo84mi",
//   createSocket: ({port, host}, firstAction) => {
//     return SocksClient.createConnection({
//       proxy: {
//         ipaddress: '159.203.75.200',
//         port: 1080,
//         type: 5
//       },
 
//       command: 'connect',
 
//       destination: {
//         host,
//         port
//       }
//     })
//   }
// })

const ModelUser = require('./models/users/model');
const ModelProducts = require('./models/products/model');
const ModelCategories = require('./models/categories/model');
const ModelSales = require('./models/sales/model');

const db = require('./db');
const jwt = require("jsonwebtoken");
const bCrypt = require('bcrypt');

db();

//const PORT = process.env.PORT || 3600;
const PORT = 3900;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
/*
app.get('/ftptest', async (req,res) => {
  
  const result = await ftp.auth( "laescueladevalores" , "lasegunda2015" , async function(hadErr) {
    //if (!hadErr)
    //alert("auth succesfull")
    return await ftp.list("./", (err, res) => {
      console.log("res: ",res);
      return res
    });
    //console.log("error? ", hadErr);
  });
  res.send({
    error: false,
    body: result, 
  }); 
})
*/

app.post('/categories/add', async (req,res) => {
  const item = {
    name: req.body.body.name,
    description: req.body.body.description,
  };
  const myRequest = new ModelCategories(item);
  const dataSaved = myRequest.save();
  res.send({
    error: false,
    body: dataSaved,
  });
});

app.get('/categories/listcategories', async (req,res)=>{ 
  const categories = await ModelCategories.find();
  res.send({
    error: false,
    body: categories,
  });
});

app.post('/categories/delete', async (req,res)=>{ 
  const category = await ModelCategories.remove({ _id: req.body.body._id });
  res.send({
    error: false,
    body: category,
  });
});

app.post('/categories/update', async (req,res) => {
  const { name, description } = req.body.body;
  const myRequest = await ModelCategories.findByIdAndUpdate({_id:req.body.body._id}, { name, description });
  res.send({
    error: false,
    body: myRequest,
  });
});

app.post('/products/delete', async (req,res)=>{ 
  const product = await ModelProducts.remove({ _id: req.body.body._id });
  res.send({
    error: false,
    body: product,
  });
});

app.post('/products/update', async (req,res) => {
  const { name, state, description, description2, price, sizex, sizey, sizez, color, size, stock, cat,  img1, imgURL1, img2, imgURL2, img3, imgURL3, filestl, imgURL4, filegcode, imgURL5, link_mp, link_ig } = req.body.body;
  const myRequest = await ModelProducts.findByIdAndUpdate({_id:req.body.body._id}, { name, state, description, description2, price, sizex, sizey, sizez, color, size, stock, cat,  img1, imgURL1, img2, imgURL2, img3, imgURL3, filestl, imgURL4, filegcode, imgURL5, link_mp, link_ig });
  res.send({
    error: false,
    body: myRequest,
  });
});

app.post('/products/add', async (req,res) => {

  //const product = await ModelProducts.findOne({ name: req.body.user });
  
  const item = {
    name: req.body.body.name,
    state: req.body.body.state,
    description: req.body.body.description,
    description2: req.body.body.description2,
    price: req.body.body.price, 
    sizex: req.body.body.sizex,
    sizey: req.body.body.sizey,
    sizez: req.body.body.sizez,
    color: req.body.body.color,
    size: req.body.body.size,
    stock: req.body.body.stock,
    cat: req.body.body.cat,
    img1: req.body.body.img1,
    imgURL1: req.body.body.imgURL1,
    img2: req.body.body.img2,
    imgURL2: req.body.body.imgURL2,
    img3: req.body.body.img3,
    imgURL3: req.body.body.imgURL3,
    filestl:req.body.body.filestl,
    imgURL4:req.body.body.imgURL4,
    filegcode:req.body.body.filegcode,
    imgURL5:req.body.body.imgURL5,
    img_home: req.body.body.img_home,
    img_featured: req.body.body.img_featured,
    link_mp: req.body.body.link_mp,
    link_ig: req.body.body.link_ig
  };

  const myRequest = new ModelProducts(item);
  const dataSaved = myRequest.save();

  res.send({
    error: false,
    body: dataSaved,
  });
});

app.get('/products/listproducts', async (req,res)=>{
  const products = await ModelProducts.find().populate('cat').exec((err, populated) => {
    res.send({
      error: false,
      body: populated,
    });  
  });
  
});

app.post('/sales/add', async (req,res) => {
  const item = {
    clientName: req.body.body.clientName,
    clientPhone: req.body.body.clientPhone,
    clientAdress: req.body.body.clientAdress,
    deliveryValue: req.body.body.deliveryValue,
    contactValue: req.body.body.contactValue,
    paymentValue: req.body.body.paymentValue,
    sellsmenValue: req.body.body.sellsmenValue,
    amount: req.body.body.amount,
    sellstateValue: req.body.body.sellstateValue,
    selectedProductsList: req.body.body.selectedProductsList
  };
  
  const myRequest = new ModelSales(item);
  const dataSaved = myRequest.save();

  res.send({
    error: false,
    body: dataSaved,
  });
});

app.post('/sales/retrieve', async (req,res) => {
  const myRequest = await ModelSales.find({_id:req.body.body._id});
  res.send({
    error: false,
    body: myRequest,
  });
});

app.post('/sales/update', async (req,res) => {
  const {clientName, clientPhone, clientAdress,deliveryValue,contactValue,paymentValue,sellsmenValue,amount,sellstateValue,selectedProductsList} = req.body.body;
  const myRequest = await ModelSales.findByIdAndUpdate({_id:req.body.body._id}, { clientName, clientPhone, clientAdress,deliveryValue,contactValue,paymentValue,sellsmenValue,amount,sellstateValue,selectedProductsList });

  res.send({
    error: false,
    body: myRequest,
  });
});

app.post('/sales/listsales', async (req,res)=>{  
  let filter = {};  
  if (req && req.body && req.body.body && req.body.body.filterStatus) {
    filter = { sellstateValue: req.body.body.filterStatus };
  }
  const sales = await ModelSales.find(filter);
  res.send({
    error: false,
    body: sales,
  });  
});

app.get('/listproducts2', async (req,res)=>{
  res.send({
    error: false,
    body: [
      {id:1, name: "product 1"},
      {id:2, name: "product 2"},
      {id:3, name: "product 3"},
    ],
  });
});

app.get('/test', checker.checkToken); 

app.post('/login', async function(req,res){
  const user = await ModelUser.findOne({ name: req.body.user });
  if (user) {
    const datos = await bCrypt.compareSync(req.body.pass, user.pass);
    if( datos ){
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.name,
        accessToken: token
      });
    }else{
      res.send({
        error: true,
        body: '',
      });
      // res.status(200).send({
      //   data:"se menea"
      // });
    }

  }else{
    res.send({
      error: true,
      body: '',
    });
  }

});

app.post('/login2', async function (req, res) {
  //console.log(req.body.user);
  //console.log(req.body.pass);



  const user = await model.findOne({ name: req.body.user });
  if (user && bCrypt.compare(req.body.pass, user.pass)) {
    
    const datos = await bCrypt.compareSync(req.body.pass, user.pass);
    //console.log(datos);
    res.send( {
      error:'',
      body: datos,
    });

  }else{
    console.log("ALGO MAL");
    const datos = "algo mal";
    //const datos = (bCrypt.compare(req.body.pass, user.pass)) ? req.body.pass+" :: "+user.pass : "notok";
  //console.log(datos);
  res.send( {
    error:'',
    body: datos,
  });
  }
  
  //console.log(datos);
});

app.get('/listado', function (req, res) {
  res.send('Listado');
});


app.listen(PORT, () => {
    console.log("Running at port " + PORT);
});




