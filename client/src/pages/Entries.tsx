// src/pages/Entries.tsx
import { useEffect, useState } from "react";
import { Entry } from "../types/types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { v4 as uuid } from "uuid";
import { useEntryStore } from "../store/entryStore";

export default function Entries() {
//   const [entries, setEntries] = useState<Entry[]>([]);

  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState({ title: "", content: "", updatedAt: '' });

  const { entries, fetchEntries, addEntry, updateEntry, deleteEntry } = useEntryStore();

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleAdd = async ()=> {
    const entry: Entry = {
      id: uuid(),
      title: newEntry.title,
      content: newEntry.content,
      createdAt: new Date().toISOString(),
    };
    // setEntries([entry, ...entries]);
    await addEntry(entry)
    setNewEntry({ title: "", content: "" });
  };

  const handleDelete = async (id: number) => {
       await deleteEntry(id);
  };

  const handleUpdate = async (id: any) => {
    await updateEntry(id, editEntry)
    setEditingId(null);
    //  fetchEntries();
  };

  const handleEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setEditEntry({ title: entry.title, content: entry.content, updatedAt: new Date().toISOString() });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📘 My Journal</h1>

      {/* Add New Entry */}
      <div className="space-y-3 bg-white p-4 rounded shadow">
        <Input
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <Textarea
          placeholder="What's on your mind?"
          value={newEntry.content}
          onChange={(e) =>
            setNewEntry({ ...newEntry, content: e.target.value })
          }
        />
        <Button  className="color" variant = "outline" onClick={handleAdd}>Add Entry</Button>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded shadow">

            {editingId === entry.id ? (
              <div key={entry.id}  className="space-y-2">
                <Input
                  value={editEntry.title}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, title: e.target.value })
                  }
                />
                <Textarea
                  value={editEntry.content}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, content: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleUpdate(entry.id)}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{entry.title}</h2>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(entry)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600">{entry.content}</p>
                <p className="text-xs text-right text-gray-400 mt-2">
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
