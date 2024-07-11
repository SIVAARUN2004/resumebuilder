import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.css'
})
export class Home2Component implements OnInit{
  uploadForm: FormGroup;
  u_name: string = '';
  private routeSubscription: Subscription | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
  navigateTo1(route:string,u_name:string)
  {
    this.router.navigate([route],{ queryParams: { u_name: u_name}})
  }
  ngOnInit(): void {
    this.routeSubscription=this.route.queryParams.subscribe(params => {
    this.u_name = params['u_name'];
      });
  }
  ngOnDestroy(): void {
      if (this.routeSubscription) {
        this.routeSubscription.unsubscribe();
      }
    }
}
