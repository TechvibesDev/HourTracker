import { UserProps } from "../types/user";
import { BehaviorSubject, Subject, scan } from "rxjs";
export const initialState: UserProps = {
    uuid: "",
    email: "",
    firstName: "",
    lastName: "",
    middlename: "",
    gender: "",
    maritalsStatus: "",
    phoneNumber: "",
    address: "",
    nextOfKin: {
        firstName: "",
        lastName: "",
        middlename: "",
        gender: "",
        email: "",
        relationship: "",
        phoneNumber: "",
        address: ""
    },
    password: "",
    createdAt: new Date()
}

export const onAddUserData = new BehaviorSubject<UserProps>(initialState);
export const useUserData = onAddUserData.pipe(
    scan((acc, curr) => Object.assign({}, acc, curr), initialState as UserProps)
);
export const StepperForm$ = new BehaviorSubject<number>(1);
export const CanSubmit = new Subject<boolean>();