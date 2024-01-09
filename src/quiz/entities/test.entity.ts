/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity('Quiz')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'title', length: 255})
  title: string;

  @Column({ name: 'creator_id' })
  creator_id: number;

  @Column({ name: 'creator_user_name', length: 255 ,  default: 'default_username' })
  creatorUserName: string;

  @Column({ name: 'quiz_data', type: 'json' })
  quizData: any;

  @Column({ name: 'students_list', type: 'json' })
  studentsList: string[];

  @Column({
    name: 'date_of_creation', 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateOfCreation: Date;

  @BeforeInsert()
  updateDates() {
    this.dateOfCreation = new Date();
    this.id = Math.floor(Math.random() * 100000); // Generate a random ID
  }
}
