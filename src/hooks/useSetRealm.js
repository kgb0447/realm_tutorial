import { useCallback } from "react";

export default function useSetRealm(context,schema = '') {
    const { useRealm } = context;
  
    // Validate the arguments
    if (!context || !useRealm || typeof useRealm !== 'function') {
      throw new Error('Invalid context or useRealm hook');
    }
    if (!schema || typeof schema !== 'string') {
      throw new Error('Invalid schema name');
    }
    
  
    const realm = useRealm();
    const setData = useCallback((object) => {
        if (!object || typeof object !== 'object') {
            throw new Error('Invalid object data');
        }
      try {
        // Write to the realm
        realm.write(() => {
          realm.create(schema, object);
        });
        // Return a success status
        return true;
      } catch (error) {
        // Log or handle the error
        console.error(error);
        // Return a failure status
        return false;
      }
    },[context,schema]);
    return { setData };
  }