import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Customer } from './index';
import axios, { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'querystring';

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
        const result = await axios.get<{ customer: Customer }>(
            `http://127.0.0.1:8000/api/customers/${params.id}`
        );

        return {
            props: {
                customer: result.data.customer,
            },
            revalidate: 60,
        };
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 404) {
                return {
                    notFound: true,
                    revalidate: 60,
                };
            }
        }
        return {
            props: {},
        };
    }
};

const Customer: NextPage<Props> = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    return <h1>Customer {props.customer ? props.customer.name : null}</h1>;
};

export default Customer;
