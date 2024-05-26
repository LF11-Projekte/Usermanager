import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";
import { randomUUID } from "crypto";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    accessToken: string

    @Column({ unique: true })
    refreshToken: string

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @Column()
    expire: number

    public constructor(init?:Partial<Token>) {
        Object.assign(this, init);
        this.accessToken = randomUUID();
        this.refreshToken = randomUUID();
        this.expire = new Date().getTime() + 1000*60*60; // 1 h
    }
}
