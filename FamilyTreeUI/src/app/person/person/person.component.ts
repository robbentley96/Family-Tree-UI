import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from 'app/models/person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: Person;
  constructor(
    private personService: PersonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.person = this.getDefaultPerson(); 
    let id = this.activatedRoute.snapshot.paramMap.get('id')!;
    personService.getPerson(id).subscribe(p => {
      this.person = p;
    });
  }

  ngOnInit(): void {
  }

  getDefaultPerson() {
    return {
      personID: '',
      firstName: '',
      middleName: '',
      lastName: '',
      maidenName: '',
      notes: '',
      isAlive: false,
      spouses: [],
      children: [],
      siblings: [],
      parents: []
    }
  }

}
