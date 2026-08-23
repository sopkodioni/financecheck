import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "src/prisma/generated/client";
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientException implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        switch(exception.code){
            case "P2025" : 
                response.status(404).json({
                    statusCode: 404,
                    message: "Record not found"
                }); 
            break;
            default: 
                response.status(500).json({
                    statusCode: 500,
                    message: "Database error"
                });
            break;
        }
    }
}