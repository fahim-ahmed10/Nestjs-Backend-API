import { Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import {UserType, adminData} from './adminData';


interface Create{
    name: string;
    email: string;
    password: string;
}


@Injectable()
export class AdminService{
    
    getAllUsers(){
        return adminData.users;
    }
    getUser(type: UserType){
        return adminData.users.filter((users) => users.type === type);
    }
    getUserById(type: UserType, id: string){
        return adminData.users
        .filter((users) => users.type === type)
        .find((users) => users.id === id);
    }

    createUser( {name, email, password} : Create, type: UserType){
        const newUser = {
            id: uuid(),
            name,
            email,
            password, 
            type, 
            created_at: new Date(),
            updated_at: new Date(),                  
      
          };
          adminData.users.push(newUser)
          return newUser;
    }   

    
}


