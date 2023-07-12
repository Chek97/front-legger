import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/* import * as publicIp  from 'public-ip'; */
import { LeadServiceService } from 'src/app/Services/lead-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  public form: FormGroup;
  publicIp: string = "";
  created: boolean = false;
  
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
      //console.log(this.form);
      this.form.markAllAsTouched();
      console.log("Entradas no validas");
      return;
      
      
    }
  }
}
