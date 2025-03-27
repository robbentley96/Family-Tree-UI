import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'app/models/person';
import { PersonSimplifiedDTO } from 'app/models/personSimplifiedDTO';
import { MarriageService } from 'app/marriages/marriage.service';
import { Marriage } from 'app/models/marriage';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  personForm: FormGroup = new FormGroup({});
  people: PersonSimplifiedDTO[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private marriageService: MarriageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
      this.personService.getPeople().subscribe(p => {
        this.people = p;
        console.log("People list updated");
      });
    }

  ngOnInit(): void {
    let marriageList = new FormArray([]);
    this.personForm = new FormGroup({
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      lastName: new FormControl(null),
      maidenName: new FormControl(null),
      parent1ID: new FormControl(null),
      parent2ID: new FormControl(null),
      dobNotKnown: new FormControl(false),
      dateOfBirth: new FormControl(null),
      yearOfBirth: new FormControl(null),
      isAlive: new FormControl(false),
      dodNotKnown: new FormControl(false),
      dateOfDeath: new FormControl(null),
      yearOfDeath: new FormControl(null),
      notes: new FormControl(null),
      marriageList: marriageList
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.people = this.people.filter(x => x.personID != id);
      this.personService.getPerson(id).subscribe(person => {
        if(person){
          person.dateOfBirth = person.dateOfBirth?.slice(0,10);
          person.dateOfDeath = person.dateOfDeath?.slice(0,10);
          if(person.parents && person.parents.length > 0) {
            person.parent1ID = person.parents[0].personID;
            if(person.parents.length > 1) {
              person.parent2ID = person.parents[1].personID;
            }
          }
          this.personForm.patchValue(person);
          for(let spouse of person.spouses) {
            (<FormArray>this.personForm.get('marriageList')).push(
              new FormGroup({
                marriageID: new FormControl(spouse.marriageID),
                personID: new FormControl(spouse.personID, Validators.required),
                startDate: new FormControl(spouse.marriageDate),
                startYear: new FormControl(spouse.marriageYear),
                startDateNotKnown: new FormControl(spouse.marriageDate == null),
              })
            );
          }
        }
      });
    }
  }

  get controls() {
    return (<FormArray>this.personForm.get('marriageList')).controls;
  }

  onAdd_marriageList() {
    (<FormArray>this.personForm.get('marriageList')).push(
      new FormGroup({
        marriageID: new FormControl(null),
        personID: new FormControl(null, Validators.required),
        startDate: new FormControl(null),
        startYear: new FormControl(null),
        startDateNotKnown: new FormControl(false),
      })
    );
  }

  onDelete_marriageList(index: number) {

    let marriageId = this.personForm.value.marriageList[index].marriageID;
    this.marriageService.deleteMarriage(marriageId).subscribe();
    (<FormArray>this.personForm.get('marriageList')).removeAt(index);
  }

  OnSubmit(){
    if(this.personForm.valid){
      let person: Person = this.personForm.value;
      if(this.personForm.get('dobNotKnown')?.value){
        person.dateOfBirth = "";
      }
      if(this.personForm.get('isAlive')?.value){
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
        this.personService.updatePerson(id, person).subscribe(() => {
          for(let marriageListItem of this.personForm.value.marriageList) {
            console.log(marriageListItem)
            let marriage: Marriage = { person1ID: id!, person2ID: marriageListItem.personID, startDate: marriageListItem.startDate, startYear: marriageListItem.startYear, marriageID: marriageListItem.marriageID };
            if (marriage.marriageID) {
              this.marriageService.updateMarriage(marriage.marriageID, marriage).subscribe();
            }
            else {
              this.marriageService.createMarriage(marriage).subscribe();
            }
          }
          this.router.navigate(['']);
        });
      }
      else {
        this.personService.createPerson(person).subscribe((data) => {
          for(let marriageListItem of this.personForm.value.marriageList) {
            let marriage: Marriage = { person1ID: data.id, person2ID: marriageListItem.personID, startDate: marriageListItem.startDateNotKnown ? null : marriageListItem.startDate, startYear: marriageListItem.startYear }
            this.marriageService.createMarriage(marriage).subscribe();
          }
          this.router.navigate(['']);
        });
      }
    }
  }
}
