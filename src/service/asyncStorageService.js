import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
    query,
    get,
    post,
    saveToStorage,
    loadFromStorage,
};

async function query(entityType, delay = 500) {
    try {
        const json = await AsyncStorage.getItem(entityType)
        const entities = json ? JSON.parse(json) : []
        return new Promise(resolve => setTimeout(() => resolve(entities), delay))
    } catch (error) {
        console.error('Error querying AsyncStorage:', error)
        return []
    }
}

async function get(entityType, entitySearchKey) {
    try {
        const entities = await query(entityType)
        const entity = entities.find(entity => entity.searchKey === entitySearchKey)
        if (!entity) {
            console.log(`Get failed, cannot find entity with searchKey: ${entitySearchKey} in: ${entityType}`)
            return []
        }
        return entity
    } catch (error) {
        console.error('Error getting entity from AsyncStorage:', error)
        throw new Error(`Get failed for ${entityType}, cannot find entity with searchKey: ${entitySearchKey}`)
    }
}

async function post(entityType, newEntity) {
    try {
        newEntity = JSON.parse(JSON.stringify(newEntity))
        newEntity._id = _makeId()
        const entities = await query(entityType)
        entities.push(newEntity);
        await _save(entityType, entities)
        return newEntity
    } catch (error) {
        console.error('Error posting entity to AsyncStorage:', error)
        throw new Error(`Error posting entity to AsyncStorage for ${entityType}: ${error}`)
    }
}

async function saveToStorage(key, val) {
    try {
        const json = JSON.stringify(val)
        await AsyncStorage.setItem(key, json)
    } catch (error) {
        console.error('Error saving to AsyncStorage:', error)
    }
}

async function loadFromStorage(key) {
    try {
        const json = await AsyncStorage.getItem(key)
        return json ? JSON.parse(json) : null
    } catch (error) {
        console.error('Error loading from AsyncStorage:', error)
        return null
    }
}


async function _save(entityType, entities) {
    try {
        const json = JSON.stringify(entities);
        await AsyncStorage.setItem(entityType, json);
    } catch (error) {
        console.error('Error saving entities to AsyncStorage:', error);
        throw error;
    }
}


function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}