import { Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { AccountDTO } from "../../../models";
import { Client } from "./Client";

@Entity()
export class Account implements AccountDTO{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startingBalance: number;

    @Column()
    balance: number;

    @ManyToOne(type => Client, (client) => client.accounts)
    client: Client;

}