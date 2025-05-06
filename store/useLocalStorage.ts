import { useState, useEffect } from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T & { isDefault: boolean }>>;

/**
 * A custom hook for persisting state in localStorage
 * @param key The key to store the value under in localStorage
 * @param initialValue The initial value to use if no value exists in localStorage
 * @returns A tuple containing the current value and a function to update it
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T & { isDefault: boolean }
): [T & { isDefault: boolean }, SetValue<T & { isDefault: boolean }>] {
    initialValue = {
        ...initialValue,
        isDefault: true
    }
    const readValue = (): T => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T & { isDefault: boolean }>(readValue() as T & { isDefault: boolean });
    const setValue: SetValue<T & { isDefault: boolean }> = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue({
                ...valueToStore,
                isDefault: false
            });

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        setStoredValue(readValue() as T & { isDefault: boolean });
    }, []);

    return [storedValue, setValue];
}