import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.css'
})
export class ResumePreviewComponent {
  title = 'Resume-Creator';
  generatePDF() {
    const elementToPrint = document.getElementById('thecontent');
    if (elementToPrint) {
      html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.setProperties({
          title: 'My Resume',
          subject: 'PDF from HTML in Angular',
          author: 'SaNjAy JaDoO'
        });
        pdf.setFontSize(12);
        //pdf.text('SaNjAy JaDoO', 14, 22);
        pdf.save('myResume.pdf');
      });
    } else {
      console.error('Element not found');
    }
  }
}
