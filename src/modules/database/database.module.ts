

import 'mongoose-paginate-v2';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../../config/configuration';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => ({
                uri: configuration().mongoUri,
                connectionFactory(connection) {
                    connection.plugin(require('mongoose-paginate-v2'));
                    return connection;
                },
            }),
        }),
    ],
})
export class DatabaseModule { }
