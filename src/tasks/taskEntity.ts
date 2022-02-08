import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./taskEnum";


@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
}