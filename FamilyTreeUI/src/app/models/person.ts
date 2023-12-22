export interface Person {
    personID: string,
    firstName: string,
    middleName: string,
    lastName: string,
    maidenName: string,
    dateOfBirth: string,
    dateOfDeath: string,
    yearOfBirth: number | undefined,
    yearOfDeath: number | undefined,
    parent1ID: string,
    parent2ID: string,
    notes: string
}
