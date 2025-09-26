import dotenv from "dotenv";
dotenv.config();

type ItemTypes = "knowledge_base";

const memory: Map<ItemTypes, Map<string, any>> = new Map();
const cacheStayAlive = Number(eval(process.env.CACHE_STAY_ALIVE!)); // 10 min

export function RetrieveCache(type: ItemTypes, key: any) {
    const typeCache = memory.get(type);
    if (!typeCache) return null;

  
    return typeCache.get(key) ?? null;
}

export function StoreCache(type: ItemTypes, objectToCache: Map<string, any>) {
    if (!memory.has(type)) {
        memory.set(type, new Map());
    }

    const typeCache = memory.get(type)!; 
    const [key, value] = [...objectToCache.entries()][0]; 

    typeCache.set(key, value); 

    setTimeout(() => {
        typeCache.delete(key); 
    }, cacheStayAlive);
}
