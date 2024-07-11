import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
}
interface Project {
  projectName: string;
  projectDescription: string;
}

interface Certification {
  certificationName: string;
  certificationAuthority: string;
}

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css'
})
export class ResumeFormComponent {
  resumeData = {
    name: '',
    email: '',
    phone: '',
    education: [] as Education[],
    experience: [] as Experience[],
    projects: [] as Project[],
    certifications: [] as Certification[]
  };
  addEducation(): void {
    this.resumeData.education.push({ degree: '', institution: '', year: '' });
  }
  addExperience(): void {
    this.resumeData.experience.push({ position: '', company: '', duration: '' });
  }
  addProject(): void {
    this.resumeData.projects.push({ projectName: '', projectDescription: '' });
  }
  addCertification(): void {
    this.resumeData.certifications.push({ certificationName: '', certificationAuthority: '' });
  }


  removeEducation(index: number): void {
    this.resumeData.education.splice(index, 1);
  }

  removeExperience(index: number): void {
    this.resumeData.experience.splice(index, 1);
  }

  removeProject(index: number): void {
    this.resumeData.projects.splice(index, 1);
  }

  removeCertification(index: number): void {
    this.resumeData.certifications.splice(index, 1);
  }



  submitResume(): void {
    console.log(this.resumeData);
  }
}
