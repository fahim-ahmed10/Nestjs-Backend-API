"use client"
import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
    const [posts, setPosts] = useState([]);
    const apiEndPoint = 'http://localhost:8000/admin/jobprovider/';
    useEffect(()=>{
        const getPosts = async () =>{
            
            const {data: res} = await axios.get(apiEndPoint);
            setPosts(res);
            //console.log(res);
        };
        getPosts();
        
    }, []);

    const addPost = async () =>
    {
        const post = {title: 'New Post', body: 'new'}
        await axios.post(apiEndPoint, post);
        setPosts([post, ...posts])
    }
    const handleUpdate = async post =>{
        post.title = 'update title';
        await axios.put(apiEndPoint + '/' + post.id);
        const postsClone = [...posts];
        const index = postsClone.indexOf(post);
        postsClone[index] = {...post};
        setPosts(postsClone);
    }
    const handleDelete = async post=> {
        await axios.delete(apiEndPoint + '/' + post.id + post);
        setPosts(posts.filter(p=> p.id !== post.id));
    }

    return (
        <>
          <div>
            <h2>There are {posts.length} post in the database</h2>
            <button onClick={addPost} className="bg-purple-500 p-2 rounded text-white mt-3">Add Post</button>
            <table className='w-full '>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                <tr key={post.id}>
                    <td>{post.title}</td>
                    <td><button onClick={()=> handleUpdate(post)} className="bg-blue-700 p-2 rounded text-white">Update</button></td>
                    <td><button onClick={()=> handleDelete(post)} className="bg-red-700 p-2 rounded text-white">Delete</button></td>
                </tr>
                ))}
            </tbody>
            </table>
          </div>  
        </>
    );
}

export default AdminPanel;