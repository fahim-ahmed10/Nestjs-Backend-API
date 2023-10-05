import { Controller, Get, Post, Put, Delete, Param } from "@nestjs/common"
import { ReportType, data } from "src/data";
@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string){
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type == reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string,@Param('id') id: string){
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
    .filter((report) => report.type === reportType)
    .find((report) => report.id === id );
  }

  @Post()
  createReport(){
    return 'created';
  }

  @Put(':id')
  updateReport(){
    return 'update';
  }

  @Delete(':id')
  deleteReport(){
    return 'delete';
  }

}


//http://localhost:3000/

//http://localhost:3000/report/income
//http://localhost:3000/report/expense
//http://localhost:3000/report/expense/sdfsd
//http://localhost:3000/report/income/idafasdfasd


