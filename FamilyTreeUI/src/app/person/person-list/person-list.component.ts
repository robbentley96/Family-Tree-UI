import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from 'app/models/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {


  people: Person[] = [];

  constructor(
    private personService: PersonService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.personService.getPeople().subscribe(p => {
      this.people = p;
    });
  }

  DeletePerson(person: Person){
    this.people = this.people.filter(x => x.personID != person.personID);
    this.personService.deletePerson(person.personID).subscribe(() => {
      this.personService.getPeople().subscribe(p => {
        this.people = p;
      });
    });
  }

  EditPerson(person: Person){
    this.router.navigate([`/person/edit/${person.personID}`]);
  }

}
