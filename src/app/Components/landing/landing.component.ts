import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeadServiceService } from 'src/app/Services/lead-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  public form: FormGroup;
  publicIp: string = "";
  created: boolean = false;
  leads = [];
  
  constructor(private leadService: LeadServiceService){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$'), Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      nit: new FormControl('', [Validators.required, Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      pointName: new FormControl('', [Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      teamName: new FormControl('', [Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      city: new FormControl('', [Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      promotor: new FormControl('', [Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      rtc: new FormControl('', [Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      captain: new FormControl('', [Validators.pattern(/^[^#“,*+¿¡?]+$/)]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
    
    this.leadService.getPublicAddress().subscribe((response: any) => {
      this.publicIp = response.ip;
    });

    this.getLeads();

  }
  
  submit(){
    if(this.form.valid){
      const newData = {
        ...this.form.value,
        ip: this.publicIp
      };

      this.leadService.postLead(newData)
        .subscribe((response: any) => {
          if(response.ok) this.created = true;
        });

    }else{
      this.form.markAllAsTouched();
      console.log("Entradas no validas");
      return;  
    }
  }

  getLeads(){
    this.leadService.getLead()
      .subscribe((response: any) => {
      this.leads = response.leads;
    });
  }

  export(){
    let name: string = 'Registros.xlsx';
    
    const workSheet: XLSX.WorkSheet= XLSX.utils.json_to_sheet(this.leads);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, workSheet, 'Hoja 1');

    XLSX.writeFile(book, name);
  }
}
