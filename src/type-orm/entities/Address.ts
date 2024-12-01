import { IsInt, Min } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './Company';

@Entity({ name: 'addresses' })
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cep: string;

    @Column()
    street: string;

    @Column()
    neighborhood: string;

    @Column()
    number: number;

    @Column({ nullable: true })
    additionalInfo: string;

    @Column()
    city: string;

    @Column()
    state: string;

    // Cada empresa tem apenas uma entrada na tabela de endereços
    @OneToMany(() => Company, (company) => company.address)
    companies: Company[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}