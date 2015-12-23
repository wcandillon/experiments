export interface Observer {
    next(value: any);
    throw(errorValue: Error);
    return();
};