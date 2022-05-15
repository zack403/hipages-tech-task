export default interface IJobData {
    id: string;
    status: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    category: {name: string};
    suburb: {name: string, postcode: string};
    description: string;
    price: number;
    created_at: Date;
    updated_at: Date;
}