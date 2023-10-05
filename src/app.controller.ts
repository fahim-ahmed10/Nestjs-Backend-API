import { Controller, Get } from "@nestjs/common"

@Controller('report/income')
export class AppController {
  @Get()
  getAllImcomeReports(){
    return[];
  }

  @Get()
  getAllImcomeReports2(){
    return{};
  }

}


//http://localhost:3000/

//http://localhost:3000/report/income

//http://localhost:3000/hello
//http://localhost:3000/hi/hello
