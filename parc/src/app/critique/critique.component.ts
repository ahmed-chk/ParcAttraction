import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { CritiqueInterface } from '../Interface/critique.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-critique',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, MatCardModule],
  templateUrl: './critique.component.html',
  styleUrl: './critique.component.scss'
})
export class CritiqueComponent implements OnInit{

  attraction_id: number | undefined;
  critiques!: Observable<CritiqueInterface[]>;

  public formulaireCritiques: FormGroup[] = [];

  constructor(
    public route: ActivatedRoute,
    public attractionService: AttractionService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    )
  {}

  ngOnInit(): void {
    this.attraction_id = Number(this.route.snapshot.paramMap.get('id'));
    this.critiques = this.attractionService.getCritiquesAttraction(this.attraction_id);
  }

  public onSubmit(critiqueFormulaire: FormGroup) {
    critiqueFormulaire.patchValue({attraction_id: this.attraction_id});
    this.attractionService.postCritique(critiqueFormulaire.getRawValue()).subscribe(result => {
      critiqueFormulaire.patchValue({critique_id: result.result});
    });
    window.location.reload();
  }

  public addCritique() {
    this.formulaireCritiques.push(
      new FormGroup({
        critique_id: new FormControl(),
        name: new FormControl(""),
        text: new FormControl(""),
        rating: new FormControl(),
        attraction_id: new FormControl()
      })
    );
  }

}
