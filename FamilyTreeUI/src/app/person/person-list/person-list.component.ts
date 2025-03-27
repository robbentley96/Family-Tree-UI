import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from 'app/models/person';
import { Router } from '@angular/router';
import { PersonSimplifiedDTO } from 'app/models/personSimplifiedDTO';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {


  people: PersonSimplifiedDTO[] = [];

  constructor(
    private personService: PersonService,
    private router: Router
    ) { 
      this.personService.getPeople().subscribe(p => {
        this.people = p;
      });
    }

  ngOnInit(): void {
    
  }

  DeletePerson(personID: string){
    this.people = this.people.filter(x => x.personID != personID);
    this.personService.deletePerson(personID).subscribe(() =>
      {
        this.personService.getPeople().subscribe(p => {
          this.people = p;
        });
      }
    );
  }

  EditPerson(personID: string){
    this.router.navigate([`/person/edit/${personID}`]);
  }

  ViewPerson(personID: string) {
    this.router.navigate([`/person/${personID}`]);
  }

}
