import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Car} from './car.entity';

@Entity()
export class Person {
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    person_id: string;
    @Column({nullable: true})
    firstname: string;
    @Column({nullable: true})
    lastname: string;
    @Column({nullable: true})
    gender: string;
    @Column({nullable: true})
    birthdate: Date;
    @OneToOne(() => Car)
    @JoinColumn({name: 'car_id_fk', referencedColumnName: 'car_id'})
    cars: Car;

}