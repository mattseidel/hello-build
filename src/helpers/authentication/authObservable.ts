import { getAuth } from "firebase/auth";
import { Observer } from "./interface";

export class AuthObservable {
  private observers: Observer[] = [];
  private loggedIn: boolean;
  constructor() {
    this.loggedIn = getAuth().currentUser ? true : false;
  }

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update(this.loggedIn));
  }

  login(): void {
    this.loggedIn = true;
    this.notify();
  }
  logout(): void {
    this.loggedIn = false;
    this.notify();
  }
}
