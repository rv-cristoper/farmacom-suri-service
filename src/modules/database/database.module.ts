import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import configuration from '../../config/configuration';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: configuration().mongoUri,
                connectionFactory(connection) {
                    connection.plugin(mongoosePaginate);
                    return connection;
                },
            }),
        }),
    ],
})
export class DatabaseModule { }
