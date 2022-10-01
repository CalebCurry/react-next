import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { getCustomers } from '../api/customers/index';

export type Customer = {
    _id?: ObjectId;
    name: string;
    industry: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getCustomers();

    return {
        props: {
            customers: data,
        },
        revalidate: 60,
    };
};

const Customers: NextPage = ({
    customers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <h1>Customers</h1>
            {customers.map((customer: Customer) => {
                return (
                    <div key={customer._id?.toString()}>
                        <p>{customer.name}</p>
                        <p>{customer.industry}</p>
                        <p>{customer._id?.toString()}</p>
                    </div>
                );
            })}
        </>
    );
};

export default Customers;
