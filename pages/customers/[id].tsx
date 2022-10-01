import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Customer } from './index';
import axios, { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { BSONTypeError } from 'bson';
import { getCustomer } from '../api/customers/[id]';

type Props = {
    customer?: Customer;
};

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    // const result = await axios.get('http://127.0.0.1:8000/api/customers');

    // const paths = result.data.customers.map((customer: Customer) => {
    //     console.log(customer.id);
    //     return { params: { id: customer.id.toString() } };
    // });

    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
    context
) => {
    const params = context.params!;

    try {
        const data = await getCustomer(params.id);
        console.log('!!!', data);

        if (!data) {
            return {
                notFound: true,
                revalidate: 60,
            };
        }

        return {
            props: {
                customer: JSON.parse(JSON.stringify(data)),
            },
            revalidate: 60,
        };
    } catch (err) {
        console.log(err);
        if (err instanceof BSONTypeError) {
            return {
                notFound: true,
            };
        }
        throw err;
    }
};

const Customer: NextPage<Props> = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    return <h1>{props.customer ? 'Customer ' + props.customer.name : null}</h1>;
};

export default Customer;
