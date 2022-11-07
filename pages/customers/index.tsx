import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { getCustomers } from '../api/customers/index';
import { useQuery } from '@tanstack/react-query';

import CustomerComponent from '../../components/Customer';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export type Order = {
    description: string;
    price: { $numberDecimal: string };
    _id: ObjectId;
};

export type Customer = {
    _id?: ObjectId;
    name: string;
    industry: string;
    orders?: Order[];
};

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getCustomers();
    console.log(data);

    return {
        props: {
            customers: data,
        },
        revalidate: 60,
    };
};

const Customers: NextPage = ({
    customers: c,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(c);
    const { data: { data: { customers = [] } = {} } = {} } = useQuery(
        ['customers'],
        () => {
            return axios('/api/customers');
        },
        { initialData: c }
    );

    return (
        <Container>
            <Grid container spacing={5} sx={{ mt: 1 }}>
                {customers.map((customer: Customer) => {
                    return (
                        <CustomerComponent
                            key={customer._id?.toString()}
                            customer={customer}
                        />
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Customers;
