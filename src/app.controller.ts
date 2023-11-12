import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe,UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { ReportType } from 'src/data';
import { AppService } from "./app.service";
import { CreateReportDto, UpdateReportDto } from "./dtos/report.dto"
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';


@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) { }

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);

  }

  @Post()
  createReport(@Body() { amount, source }: CreateReportDto, @Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.appService.deleteReport(id);

  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' })
  }
}


//http://localhost:3000/

//http://localhost:3000/report/income
//http://localhost:3000/report/expense
//http://localhost:3000/report/expense/sdfsd
//http://localhost:3000/report/income/idafasdfasd


