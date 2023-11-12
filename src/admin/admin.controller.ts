import { Controller, Post, Body, Get, Param, ParseEnumPipe, ParseUUIDPipe } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/admin.dto";
import { AdminService } from "./admin.service";
import { UserType } from "./adminData";

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) { }


@Get()
getAllUsers(){
    return this.adminService.getAllUsers();
}
@Get(':type')
getUser(@Param('type', new ParseEnumPipe(UserType)) type: string){
    const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    return this.adminService.getUser(userType);
}
@Get(':type/:id')
getUserById(@Param('type', new ParseEnumPipe(UserType)) type: string,
@Param('id', ParseUUIDPipe) id: string){
    const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    return this.adminService.getUserById(userType, id);
}


@Post(':type')
createUser(@Body() {name, email, password} : CreateUserDto, @Param('type', new ParseEnumPipe(UserType)) type: string){
    const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    return this.adminService.createUser({name, email, password}, userType);
}

}