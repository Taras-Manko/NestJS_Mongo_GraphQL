import {Entity,ObjectIdColumn,Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Students {
    @ObjectIdColumn()
    _id:string

    @PrimaryColumn()
    id:string

    @Column()
    firstName:string

    @Column()
    lastName:string
}