import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg  } from "@prisma/adapter-pg"
import { PrismaClient } from "src/generated/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    private readonly logger = new Logger(PrismaService.name);

    constructor(configService: ConfigService){
        const connectionString = configService.getOrThrow<string>("DATABASE_URL");
        const adapter = new PrismaPg({ connectionString });
        super({ adapter });
    }

    async onModuleInit() {
        try{
            await this.$connect();
            this.logger.log('Connect to DB  | SUCCEFUL')
        } catch(e){
            this.logger.log('Connect to DB  | ERROR')
            process.exit(1)
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Disconnect DB')
    }
}