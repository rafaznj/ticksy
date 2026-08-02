export type QueryError = (error: object) => void;

export type QuerySuccess<T> = (data: T) => void;
