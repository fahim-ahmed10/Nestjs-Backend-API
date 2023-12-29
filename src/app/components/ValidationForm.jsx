"use client";
import React from 'react';

function ValidationForm(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isValidLength, setIsValidLength] = useState(true);
    const handleForm = (e) => {
        e.preventDefault();
        //console.log("Username:",username,"Password:", password);
        console.log(e);
    };
    const handleUsernameLength=(e)=>{
        let username = e.target.value;
        if(username.length>0 && username.length<=4){
            setIsValidLength(false)
        }
        else{
            setIsValidLength(true)
        }
    };
    const handlePasswordLength=(e)=>{
        let password = e.target.value;
        if(password.length>0 && password.length<=8){
            setIsValidLength(false)
        }
        else{
            setIsValidLength(true)
        }
    };

    return (
        <div className='max-w-96 mx-auto mt-20 bg-sky-950 p-10  text-white '>
            <p className='text-center mb-6 '>Please Login</p> 
            <form onSubmit={handleForm}>
                <div className='mb-5 flex flex-col justify-between '>
                    <label>Username</label>
                    <input className='text-black pl-1 outline-none appearence-none border border-blue-600 rounded-sm' type="text" onChange={handleUsernameLength} required/>
                    {
                        !isValidLength && <p className='text-red-400'>Minimum length required is 5</p>
                    }
                </div>
                <div className='mb-9 flex flex-col justify-between'>
                    <label>Password</label>
                    <input className='text-black pl-1  outline-none appearence-none border border-blue-600 rounded-sm' type="password" onChange={handlePasswordLength} required/>
                    {
                        !isValidLength && <p className='text-red-400'>Minimum length is 8 character</p>
                    }
                </div> 
                <div className='text-center'>
                    <button className='bg-blue-800 p-1 rounded' type="submit">Submit</button>
                    
                </div>

            </form>
        </div>
        
    );
}

export default ValidationForm;