// src/store/entryStore.ts
import { create } from 'zustand';
import axios from 'axios';

export interface Entry {
    id: any;
    title: string,
    content: string;
    createdAt: string;
    updatedAt?: string;
}

interface EntryStore {
    entries: Entry[];
    fetchEntries: () => Promise<void>;
    addEntry: (entry: Entry) => Promise<void>;
    updateEntry: (id: number, data: Partial<Entry>) => Promise<void>;
    deleteEntry: (id: number) => Promise<void>;
}

export const useEntryStore = create<EntryStore>((set) => ({
    entries: [],

    fetchEntries: async () => {
        const res = await axios.get<Entry[]>('http://localhost:3001/entries');
        set({ entries: res.data });
    },

    addEntry: async (entry: Entry) => {
        const res = await axios.post<Entry>('http://localhost:3001/entries', entry);


        console.log(entry)
        console.log(res.data)

        set((state) => ({ entries: [...state.entries, res.data] }));
    },

    // updateEntry: async (id, updatedEntry) => {
    //     const res = await axios.put<Entry>(`http://localhost:3001/entries/${id}`, updatedEntry);
    //     set((state) => ({
    //         entries: state.entries.map((e) => (e.id === id ? res.data : e)),
    //     }));
    // },

    updateEntry: async (id, updatedData) => {
        await axios.put<Entry>(`http://localhost:3001/entries/${id}`, updatedData);
        set((state) => ({
            entries: state.entries.map((entry) =>
                entry.id === id ? { ...entry, ...updatedData } : entry
            ),
        }));
    },

    deleteEntry: async (id) => {
        await axios.delete(`http://localhost:3001/entries/${id}`);
        set((state) => ({
            entries: state.entries.filter((e) => e.id !== id),
        }));
    },
}));
