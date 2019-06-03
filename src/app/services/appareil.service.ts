import { Subject } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {
    appareilSubject = new Subject<any[]>();
    private appareils = [
        { name: 'Machine à laver', status: 'éteint', id: 1 },
        { name: 'Télévision', status: 'allumé', id: 2 },
        { name: 'Ordinateur', status: 'éteint', id: 3 }
    ];

    constructor(private httpClient: HttpClient) { }

    switchOnAll() {
        for (const appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }

    switchOffAll() {
        for (const appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find((appareilObject) => {
            return appareilObject.id === id;
        });
        return appareil;
    }

    emitAppareilSubject() {
        this.appareilSubject.next(this.appareils.slice());
    }

    addAppareil(name: string, status: string) {
        const appareil = {
            id: 0,
            name: '',
            status: ''
        };
        appareil.name = name;
        appareil.status = status;
        appareil.id = this.appareils[this.appareils.length - 1].id + 1;
        this.appareils.push(appareil);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient.put('https://open-classrooms-http-client.firebaseio.com/appareils.json', this.appareils).subscribe(
            () => {
                console.log('Enregistrement OK');
            },
            (e) => {
                console.log('Enregistrement KO', e);
            }
        );
    }

    getAppareilsFromServer() {
        this.httpClient.get<any[]>('https://open-classrooms-http-client.firebaseio.com/appareils.json').subscribe(
            (response) => {
                this.appareils = response;
                this.emitAppareilSubject();
                console.log('Get OK');
            },
            (e) => {
                console.log('Get KO', e);
            }
        );
    }
}
