export type UserProps = {
    uuid?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    middlename?: string;
    gender?: string;
    maritalsStatus?: string;
    phoneNumber?: string;
    address?: string;
    nextOfKin?: {
        firstName: string;
        lastName: string;
        middlename: string;
        gender: string;
        email: string;
        relationship: string;
        phoneNumber: string;
        address: string;
    }
    createdAt?: Date;
    password?: string;
}