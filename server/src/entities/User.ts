import { Field, ID, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@ObjectType()
@Entity() // db table
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number

	@Field((_type) => ID)
	@Column({ unique: true })
	username!: string

	@Field()
	@Column({ unique: true })
	email!: string

	@Column()
	password!: string

	@Field()
	@CreateDateColumn()
	createdAt: Date

	@Field()
	@CreateDateColumn()
	updatedAt: Date
}
