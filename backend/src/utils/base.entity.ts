import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

export abstract class AbstractBaseEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment', {unsigned: true})
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", default:  "0000-00-00 00:00:00", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date

}