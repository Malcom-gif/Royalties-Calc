import { query, nat, update, StableBTreeMap, Vec, text, Canister, } from "azle";
import { v4 as uuidv4 } from "uuid";
import { Artist, ArtistPayload, User, UserPayload, Manager, ManagerPayload, Song, SongPayload, Logsheet, LogsheetPayload, } from "./types";
let artists = StableBTreeMap(text, Artist, 14);
let users = StableBTreeMap(text, User, 15);
let managers = StableBTreeMap(text, Manager, 16);
let songs = StableBTreeMap(text, Song, 17);
let logsheets = StableBTreeMap(text, Logsheet, 20);
let matchedSongs = StableBTreeMap(text, nat, 21);
export default Canister({
    // Register Artist
    addArtist: update([ArtistPayload], Artist, (payload) => {
        let artist = {
            id: uuidv4(),
            FullName: payload.FullName,
            Pseudoname: payload.Pseudoname,
            National_ID: payload.National_ID,
            Date_of_Birth: payload.Date_of_Birth,
            Nationality: payload.Nationality,
            Genre: payload.Genre,
            Phonenumber: payload.Phonenumber,
            Email: payload.Email,
        };
        artists.insert(artist.id, artist);
        return artist;
    }),
    // Register User
    addUser: update([UserPayload], User, (payload) => {
        let user = {
            id: uuidv4(),
            Name: payload.Name,
            Phonenumber: payload.Phonenumber,
            Email: payload.Email,
        };
        users.insert(user.id, user);
        return user;
    }),
    // Get all users
    getAllUsers: query([], Vec(Artist), () => {
        return artists.values();
    }),
    // Register Manager
    addManager: update([ManagerPayload], Manager, (payload) => {
        let manager = {
            id: uuidv4(),
            Name: payload.Name,
            Phonenumber: payload.Phonenumber,
            Email: payload.Email,
        };
        managers.insert(manager.id, manager);
        return manager;
    }),
    // Upload Music Details
    addSong: update([SongPayload], Song, (payload) => {
        let song = {
            id: uuidv4(),
            Title: payload.Title,
            Composer: payload.Composer,
            ArtistId: payload.ArtistId,
            PlayCount: 0n,
        };
        songs.insert(song.id, song);
        return song;
    }),
    // View all songs
    getAllSongs: query([], Vec(Song), () => {
        return songs.values();
    }),
    addLogsheet: update([LogsheetPayload], Logsheet, (payload) => {
        let logsheet = {
            id: uuidv4(),
            createdBy: payload.createdBy,
            SongTitle: payload.SongTitle,
            NumberOfPlays: payload.NumberOfPlays,
            Composer: payload.Composer,
        };
        logsheets.insert(logsheet.id, logsheet);
        return logsheet;
    }),
    calculateRoyalties: query([nat], Vec(text), (amount) => {
        // Step 1: Calculate total play count
        let totalPlayCount = 0n;
        for (const count of matchedSongs.values()) {
            totalPlayCount += count;
        }
        // Step 2: Calculate amount per play
        const amountPerPlay = totalPlayCount > 0n ? amount / totalPlayCount : 0n;
        // Step 3: Calculate royalties for each song
        const royalties = [];
        for (const song of songs.values()) {
            const songTitle = song.Title;
            // Check if the song title exists in the matchedSongs BTreeMap
            if (matchedSongs.has(songTitle)) {
                const playCount = matchedSongs.get(songTitle).Some || 0n;
                const royalty = playCount * amountPerPlay;
                royalties.push({ songTitle, royalty });
            }
        }
        return royalties;
    }),
    // Function to add dummy data for demonstration
    addDummyData: update([], text, () => {
        // Add some dummy data to matchedSongs
        matchedSongs.insert("Song1", 100n);
        matchedSongs.insert("Song2", 150n);
        matchedSongs.insert("Song3", 75n);
        matchedSongs.insert("Song4", 120n);
        return "Dummy data added successfully.";
    }),
});
