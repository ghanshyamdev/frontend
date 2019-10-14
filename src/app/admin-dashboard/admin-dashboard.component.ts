import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpCallsService } from '../shared/services/http-calls.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  uploadForm: FormGroup;
  selectedFile: File;
  experienceModel = {
    name: '',
    description: '',
    rating: '',
    price: ''
  };
  columns = [];
  showForm = false;
  rows = [];
  @ViewChild('myTable', {static: false}) table;
  @ViewChild('buttonsTemplate', {static: false}) buttonsTemplate: TemplateRef<any>;


  constructor(private service: HttpCallsService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.loadAll();
    this.columns = [
      {prop: 'title', name: 'NAME'},
      {prop: 'desc', name: 'DESCRIPTION'},
      {prop: 'price', name: 'PRICE'},
      {prop: 'rating', name: 'RATING'},
      {prop: 'imageURL', name: 'PHOTO'},
      {prop: 'actions', name: 'Actions', cellTemplate: this.buttonsTemplate}
    ];
    this.uploadForm = this.formBuilder.group({
      photo: ['']
    });
  }

  onDeleteRow(row: any) {
    const action = confirm('Are you sure ?');
    if (!action) {
      return;
    }
    this.service.deleteArticle(row.id)
      .then((data) => {
        this.loadAll();
      })
      .catch((error) => {
        console.error('AdminDashboardComponent : onDeleteRow : Error : ', error);
      });
  }

  loadAll() {
    this.service.loadAllArticles()
      .then((articles) => {
        this.rows = [...articles];
      })
      .catch((error) => {
        console.log('AdminDashboardComponent : ngOnInit : Error : ', error);
      });
  }


  onFileSelect(event) {
    this.selectedFile = event.target.files;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('photo', this.selectedFile[0], this.selectedFile[0].name);
    formData.append('title', this.experienceModel.name);
    formData.append('desc', this.experienceModel.description);
    formData.append('price', this.experienceModel.price);
    formData.append('rating', this.experienceModel.rating);
    this.service.addNewArticle(formData).then((data) => {
        this.loadAll();
        this.showForm = false;
        
    }).catch((error) => {
        console.error('AdminDashboardComponent : onSubmit : Error : ', error);
    });
  }
}
