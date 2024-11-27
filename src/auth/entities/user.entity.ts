import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'text',
        unique: true
    })
    email: string;

    @Column({
        type: 'text'
    })
    password: string;

    @Column({
        type: 'text'
    })
    firstName: string

    @Column({
        type: 'text'
    })
    lastName: string;

    @Column({
        type: 'bool',
        default: true
    })
    isActive: boolean;

    @Column({
        type: 'text',
        array: true,
        default: ['USER']
    })
    roles: string[];

    @BeforeInsert()
    @BeforeUpdate()
    lowerCase() {
        this.email = this.email.toLocaleLowerCase().trim();
    }
}