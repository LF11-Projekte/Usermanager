import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";
import { randomUUID } from "crypto";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string 

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @Column()
    created: Date = new Date()

    @Column({
        nullable: true
    })
    lastAccess: Date|null

    public constructor(init?:Partial<Token>) {
        Object.assign(this, init);
        this.token = randomUUID();
    }
}
