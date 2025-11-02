// Database client for Entelech Platform
// Using in-memory storage for now - can be replaced with Supabase or other DB later
const clients: any[] = [];
const engagements: any[] = [];

export const database = {
  clients: {
    getAll: () => Promise.resolve(clients),
    create: (client: any) => {
      clients.push(client);
      return Promise.resolve(client);
    },
    getById: (id: string) => Promise.resolve(clients.find(c => c.id === id)),
  },
  engagements: {
    getAll: () => Promise.resolve(engagements),
    create: (engagement: any) => {
      engagements.push(engagement);
      return Promise.resolve(engagement);
    },
    getById: (id: string) => Promise.resolve(engagements.find(e => e.id === id)),
  },
};

export default database;
