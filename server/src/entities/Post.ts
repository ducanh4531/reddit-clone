import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	title!: string

	@Column()
	body!: string

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date
}
