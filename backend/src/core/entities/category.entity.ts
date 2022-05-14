import { Column, Entity, Index} from 'typeorm';
import { AbstractBaseEntity } from '../../utils/base.entity';

@Entity('categories')
export class CategoryEntity extends AbstractBaseEntity {
  

  @Column({type: "varchar", length: 255})
  name: string;

  @Column({type: "int", unsigned: true, default: 0})
  @Index('idx_categories_parent_category')
  parent_category_id: number;

  
}

