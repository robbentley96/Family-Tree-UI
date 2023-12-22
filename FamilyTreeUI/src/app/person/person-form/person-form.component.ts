import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'app/models/person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  personForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      middleName: ['',Validators.nullValidator],
      lastName: ['',Validators.required],
      maidenName: ['',Validators.nullValidator],
      dobNotKnown: ['',Validators.nullValidator],
      dateOfBirth: ['',Validators.nullValidator],
      yearOfBirth: ['',Validators.nullValidator],
      alive: ['',Validators.nullValidator],
      dodNotKnown: ['',Validators.nullValidator],
      dateOfDeath: ['',Validators.nullValidator],
      yearOfDeath: ['',Validators.nullValidator],
      notes: ['',Validators.nullValidator]
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.personService.getPerson(id).subscribe(person => {
        if(person){
          person.dateOfBirth = person.dateOfBirth?.slice(0,10);
          person.dateOfDeath = person.dateOfDeath?.slice(0,10);
          this.personForm.patchValue(person);
        }
      });
    }
  }

  OnSubmit(){
    if(this.personForm.valid){
      let person: Person = this.personForm.value;
      if(this.personForm.get('dobNotKnown')?.value){
        person.dateOfBirth = "";
      }
      if(this.personForm.get('alive')?.value){
        person.dateOfDeath = "";
        person.yearOfDeath = undefined;
      }
      else if(this.personForm.get('dodNotKnown')?.value){
        person.dateOfDeath = "";
      }
      else{
        person.yearOfDeath = undefined;
      }
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.personService.updatePerson(id, person).subscribe(() => {this.router.navigate(['/person']);});
      }
      else {
        this.personService.createPerson(person).subscribe(() => {this.router.navigate(['/person']);});
      }
    }
  }
}
