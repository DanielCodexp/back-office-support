import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormbHelper } from '../helper/form-helper';
import { DataCars } from '../interface/datacars';
import { getDownloadURL, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage'
import { doc } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomFile } from '../interface/CustomFile';
import { CarsService } from '../services/cars.service';
import { Router } from '@angular/router';
import { RoutePath } from '../phats/route-path.constant';

declare var $: any;
@Component({
  selector: 'app-car-plus',
  templateUrl: './car-plus.component.html',
  styleUrls: ['./car-plus.component.scss']
})
export class CarPlusComponent implements OnInit {
  public isProcessing = false;
  public form: FormGroup;
  public error = false;
  public infoCar: any = [];
  public url = '';
  public file: CustomFile;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private carService: CarsService
  ) { 

    this.form = fb.group({
      carBrand: [, [Validators.required]],
      price_day: [, [Validators.required]],
      largeBaggage: [, [Validators.required]],
      smallBaggage: [, [Validators.required]],
      persons: ["",[Validators.required]],
      smoke: ["",[Validators.required]],
      airConditioner: ["",[Validators.required]],
      type: ["",[Validators.required]],
      chofer: ["",[Validators.required]],
      file: ["",[Validators.required]]
    });
  
  }

  ngOnInit(){
   
  }

  public  uploadImage($event : any){

    const file = $event.target.files[0]
    var reader = new FileReader(); 
    reader.onload = (e: any) => {
      const format = file.type;
      this.file = {
        value: this.sanitizer.bypassSecurityTrustUrl(e.target.result),
        data: file
      };

      $event.target.value = "";
    };
    reader.readAsDataURL(file);

  }




  public async saveData(){
    if(this.form?.invalid)
    {
      this.error=true;
     return
    }

    const imgRef = ref(this.storage, `images/${this.file.data.name}`);
    this.isProcessing= true

    uploadBytes(imgRef, this.file.data)

        .then(async response =>{ 
        
             const carDocRef = ref(this.storage, response.metadata.fullPath);
             const url = await getDownloadURL(carDocRef);

         let smoke = false;
         let air = false ;
         let chofer = false;

         if(this.form.get("smoke")?.value == 'true'){
          smoke = true;
        }
    
        if(this.form.get("airConditioner")?.value == 'true'){
          air = true;
        }

        if(this.form.get("chofer")?.value == 'true'){
          chofer = true;
        }
    
        const infoDataCar: DataCars = {
          carBrand: this.form.get("carBrand")?.value,
          available:true,
          price_day: this.form.get("price_day")?.value,
          largeBaggage: this.form.get("largeBaggage")?.value,
          smallBaggage: this.form.get("smallBaggage")?.value,
          persons: this.form.get("persons")?.value,
          smoke: smoke,
          airConditioner: air,
          type: this.form.get("type")?.value,
          chofer: chofer,
          url: url

    
          }
    
          this.infoCar = infoDataCar;
         this.isProcessing= true
          this.carService.addCar(this.infoCar)
            .finally(() => this.infoCar = false)
            .then(response => {
    
              this.router.navigate([`/${RoutePath.HOME_PATH}`]);
            
            })
            .catch(error => console.log(error))
         

       })
       .catch(error => console.log(error))
 
    
    }


     
  public getMessage(msg:string): string {
    return FormbHelper.getMessage(msg);
  }
   
  }

