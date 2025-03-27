export interface PersonSimplifiedDTO {
    personID: string,
    name: string,
    dates: string
}

export interface Spouse extends PersonSimplifiedDTO {
    marriageDate?: Date,
    marriageYear?: number,
    marriageID: string
}