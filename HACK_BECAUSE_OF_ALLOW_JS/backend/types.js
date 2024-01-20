import { int, text, Record, } from "azle";
export const ArtistId = text;
export const UserId = text;
export const ManagerId = text;
export const LogsheetId = text;
export const SongId = text;
export const Artist = Record({
    id: text,
    FullName: text,
    Pseudoname: text,
    National_ID: text,
    Date_of_Birth: text,
    Nationality: text,
    Genre: text,
    Phonenumber: text,
    Email: text,
});
export const ArtistPayload = Record({
    FullName: text,
    Pseudoname: text,
    National_ID: text,
    Date_of_Birth: text,
    Nationality: text,
    Genre: text,
    Phonenumber: text,
    Email: text,
});
export const User = Record({
    id: text,
    Name: text,
    Phonenumber: text,
    Email: text,
});
export const UserPayload = Record({
    Name: text,
    Phonenumber: text,
    Email: text,
});
export const Manager = Record({
    id: text,
    Name: text,
    Phonenumber: text,
    Email: text,
});
export const ManagerPayload = Record({
    Name: text,
    Phonenumber: text,
    Email: text,
});
export const Song = Record({
    id: text,
    Title: text,
    Composer: text,
    ArtistId: text,
    PlayCount: int,
});
export const SongPayload = Record({
    Title: text,
    Composer: text,
    ArtistId: text,
    PlayCount: int,
});
export const Logsheet = Record({
    id: text,
    createdBy: text,
    SongTitle: text,
    NumberOfPlays: int,
    Composer: text,
});
export const LogsheetPayload = Record({
    createdBy: text,
    SongTitle: text,
    NumberOfPlays: int,
    Composer: text,
});
