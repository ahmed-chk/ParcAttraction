import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from './data.service';
import { AttractionInterface } from '../Interface/attraction.interface';
import { CritiqueInterface } from '../Interface/critique.interface';
import { MessageInterface } from '../Interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  constructor(private dataService: DataService) {

  }

  public getAllAttraction() : Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/attraction"
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

  public getAllVisibleAttraction() : Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/visible_attraction"
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

  public postAttraction(attraction: AttractionInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/attraction";
    const data = this.dataService.postData(url, attraction);
    return data as Observable<MessageInterface>;
  }

  public getCritiquesAttraction(id: number) : Observable<CritiqueInterface[]> {
    const url = "http://127.0.0.1:5000/attraction/" + id + "/critiques";
    const data = this.dataService.getData(url);
    return data as Observable<CritiqueInterface[]>;
  }

  public postCritique(critique: CritiqueInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/attraction/critique";
    const data = this.dataService.postData(url, critique);
    return data as Observable<MessageInterface>;
  }
}