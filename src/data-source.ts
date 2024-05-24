import "reflect-metadata"
import { DataSource } from 'typeorm'
import { User } from "./entity/User"
import { Token } from "./entity/Token"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Token],
    migrations: [],
    subscribers: [],
})
