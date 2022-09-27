import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Order: NextPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    return <h1>Order {orderId}</h1>;
};

export default Order;
