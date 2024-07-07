// import { Logger, Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import * as mongoosePaginate from 'mongoose-paginate-v2';
// import { ConfigurationService } from 'src/config/configuration.service';
// import { Connection } from 'mongoose';

import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ConfigurationService } from '../../config/configuration.service';
import configuration from '../../config/configuration';

@Module({
    imports: [
        // MongooseModule.forRootAsync({
        //     useFactory: async () => ({
        //         uri: configuration().mongoUri,
        //         connectionFactory(connection) {
        //             connection.plugin(mongoosePaginate);
        //             return connection;
        //         },
        //     }),
        // }),
        MongooseModule.forRootAsync({
            useFactory: async (configurationService: ConfigurationService) => ({
                uri: configuration().mongoUri,
                connectionFactory: (connection: Connection) => {
                    if (connection.readyState === 1) {
                        Logger.log(`MongoDB Connected with: ${connection.host}`);
                    }
                    connection.on('disconnected', () => {
                        Logger.warn('DB disconnected');
                    });
                    connection.on('error', (error) => {
                        Logger.error(`DB connection failed! for error: ${error}`);
                    });
                    // connection.plugin(mongoosePaginate);
                    return connection;
                },
            }),
            // inject: [ConfigurationService],
        }),
    ],
})
export class DatabaseModule { }
