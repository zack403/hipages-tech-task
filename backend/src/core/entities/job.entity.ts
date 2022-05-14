import { IsEmail } from 'class-validator';
import { JobStatus } from '../../utils/enum';
import { Column, Entity, Index, JoinColumn, ManyToOne} from 'typeorm';
import { AbstractBaseEntity } from '../../utils/base.entity';
import { CategoryEntity } from './category.entity';
import { SuburbEntity } from './suburb.entity';

@Entity('jobs')
export class JobEntity extends AbstractBaseEntity {
   

  @Column({type: "varchar", length: 50, default: JobStatus.NEW})
  status: string;

  @Column({type: "int",  unsigned: true, default: 0})
  @Index('idx_jobs_suburb')
  suburb_id: number;

  @Column({type: "int", unsigned: true, default: 0})
  @Index('idx_jobs_category')
  category_id: number;

  @Column({type: "varchar", length: 255})
  contact_name: string;

  @Column({type: "varchar", length: 255})
  contact_phone: string;

  @Column({type: "varchar", length: 255})
  @IsEmail()
  contact_email: string;

  @Column({type: "int", unsigned: true})
  price: number;

  @Column({type: 'text'})
  description: string;
  
  @ManyToOne(() => CategoryEntity, { eager: true})
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id'})
  category: CategoryEntity;

  @ManyToOne(() => SuburbEntity, { eager: true})
  @JoinColumn({ name: 'suburb_id', referencedColumnName: 'id'})
  suburb: SuburbEntity;


  
}

