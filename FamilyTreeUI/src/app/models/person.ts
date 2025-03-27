import { PersonSimplifiedDTO, Spouse } from "./personSimplifiedDTO";

export interface Person {
    personID: string,
    firstName: string,
    middleName: string,
    lastName: string,
    maidenName: string,
    parent1ID?: string,
    parent2ID?: string,
    dateOfBirth?: string,
    dateOfDeath?: string,
    yearOfBirth?: number,
    yearOfDeath?: number,
    notes: string,
    isAlive: boolean,
    spouses: Spouse[],
    children: PersonSimplifiedDTO[],
    siblings: PersonSimplifiedDTO[],
    parents: PersonSimplifiedDTO[]
}
