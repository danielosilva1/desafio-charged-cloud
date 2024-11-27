import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './Address';

@Entity({ name: 'companies' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnpj: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    // Id do endereço pode ter várias entradas na tabela de empresas
    @ManyToOne(() => Address, (address) => address.companies)
    @JoinColumn({name: 'addressId'}) // Cria campo addressId na tabela de empresas
    address: Address;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}