import { Entity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { ClientDTO } from "../../../models";
import { Account } from "./Account";

@Entity()
export class Client implements ClientDTO{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phonenumber: string;

    @OneToMany(type => Account, account => account.client, { eager: true })
    accounts: Account[];
}