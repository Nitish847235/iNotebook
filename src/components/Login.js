import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:9000/api/auth/login`,{
        method : 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Logged in Successfully!","success");
    }
    else{
      props.showAlert("Invalid Credentials!","danger");
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} name="password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login