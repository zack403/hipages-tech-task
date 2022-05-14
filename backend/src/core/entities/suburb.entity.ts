import { Column, Entity, Index} from 'typeorm';
import { AbstractBaseEntity } from '../../utils/base.entity';

@Entity('suburbs')
export class SuburbEntity extends AbstractBaseEntity {


    @Column({type: "varchar", length: 255})
    name: string;

    @Column({type: "varchar", length: 4})
    @Index('idx_suburbs_postcode')
    postcode: string;

  
}

