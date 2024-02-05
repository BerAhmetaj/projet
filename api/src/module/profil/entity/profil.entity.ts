import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {BaseEntity} from "../../baseentity";
import { Credential } from "@security/model";


@Entity()
export class Profil extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_profil: string;

    @ManyToOne(() => Credential, {eager: false})
    @JoinColumn({referencedColumnName: 'credential_id', name: 'credential_id'})
    credential_id: string;

    @Column({ nullable: true })
    Photo_de_profil: string;

    @Column({ nullable: true })
    Description: string;

    @Column({ nullable: true })
    Statut: string;

    @Column()
    Nom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;
}
