export interface Ipatient{
    id: number;
    patient_unique_code: string;
    patient_name: string;
    address: string;
    locality: string;
    helper_name: string;
    problem: string;
    problem_description: string;
    department: string;
    department_name?: string;
    avail_ambulance: string;
    patient_mobile: string;
    helper_mobile: string;
    latitude: string;
    longitude: string;
}