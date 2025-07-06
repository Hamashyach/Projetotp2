import { IObserver } from "./IObserver";

// A interface do Subject, que os observers irão observar.
export interface ISubject {
    registerObserver(observer: IObserver): void;
    unregisterObserver(observer: IObserver): void;
    notifyObservers(data: any): void;
}