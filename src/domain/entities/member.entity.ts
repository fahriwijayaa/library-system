import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Borrow } from './borrow.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  hasPenalty: boolean;

  @Column({ type: 'date', nullable: true })
  penaltyUntil: Date | null;

  @OneToMany(() => Borrow, (borrow) => borrow.member)
  borrows: Borrow[];
}
