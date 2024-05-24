import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Token } from "./Token";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    adName: string

    @Column()
    displayName: string

    @Column()
    description: string = ""

    @Column()
    profilePicture: string = "/media/default.jpeg"

    @Column()
    privileges: number = 0

    @OneToMany(() => Token, (token) => token.id)
    tokens: Token[]

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}
