import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import Info from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

import { Customer } from '../pages/customers';

const Customer = ({ customer }: { customer: Customer }) => {
    return (
        <div
            key={customer._id?.toString()}
            style={{ marginBottom: 40, padding: 10 }}
        >
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <Tooltip title={customer._id?.toString()}>
                    <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
                </Tooltip>
                {customer.name}
            </span>
            <p>{customer.industry}</p>
            <Button variant="contained">View Orders</Button>
        </div>
    );
};

export default Customer;
