const PREFIX = 'tmq_';

export const storage = {
  get: (key: string) => {
    const data = localStorage.getItem(`${PREFIX}${key}`);
    return data ? JSON.parse(data) : null;
  },
  set: (key: string, value: any) => {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  },
  
  // Entity CRUD
  getEntities: <T>(key: string): T[] => storage.get(key) || [],
  saveEntities: <T>(key: string, entities: T[]) => storage.set(key, entities),
  
  addEntity: <T extends { id: string }>(key: string, entity: T) => {
    const entities = storage.getEntities<T>(key);
    storage.saveEntities(key, [...entities, entity]);
  },
  
  updateEntity: <T extends { id: string }>(key: string, updated: T) => {
    const entities = storage.getEntities<T>(key);
    storage.saveEntities(key, entities.map(e => e.id === updated.id ? updated : e));
  },
  
  deleteEntity: <T extends { id: string }>(key: string, id: string) => {
    const entities = storage.getEntities<T>(key);
    storage.saveEntities(key, entities.filter(e => e.id !== id));
  }
};
