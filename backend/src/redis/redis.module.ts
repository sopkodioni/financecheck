import { Module } from "@nestjs/common";
import { RedisSerivce } from "./redis.service";

@Module({
    providers: [RedisSerivce],
    exports: [RedisSerivce]
})
export class RedisModule{}