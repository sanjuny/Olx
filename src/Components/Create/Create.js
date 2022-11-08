import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {useHistory} from 'react-router-dom'
import {FirebaseContext,AuthContext} from '../../store/Context'
const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('');
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const [error, setError] = useState({})
  const history = useHistory()
  const date = new Date()

  const datas = {
    name,category,price,image
  }
  const handleSubmit =()=>{

    const error =validateData(datas)
    setError(error)
    if(Object.keys(error) == 0){
          firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
            ref.getDownloadURL().then((url)=>{
              console.log(url);
              firebase.firestore().collection('products').add({
                name,
                category,
                price,
                url,
                userId:user.uid,
                createdAt:date.toDateString()
              })
              history.push('/')
            })
          })
        }
  }

  const validateData=(datas)=>{
const err={}
    if(!datas.name){
      err.name = 'Name is required'
    }
    if(!datas.category){
      err.category = 'category is required'
    }
    if(!datas.price){
      err.price = 'price is required'
    }
    if(!datas.image){
      err.image = 'Provide a Image'
    }

    return err;

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
              required
            />
            <p className='error'>{error.name}</p>
            
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
              required
            />
             <p className='error'>{error.category}</p>
            
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="fname" name="Price" required/>
             <p className='error'>{error.price}</p>
            <br />
          
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} ></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
             <p className='error'>{error.image}</p>
            
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
