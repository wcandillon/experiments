export interface Observer<T> {
    next(value: T);
    throw(errorValue: Error);
    return();
};