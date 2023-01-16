import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormbHelper } from 'src/app/helper/form-helper';
import { CustomFile } from 'src/app/interface/CustomFile';
import { DataCars } from 'src/app/interface/datacars';
import { RoutePath } from 'src/app/phats/route-path.constant';
import { CarsService } from 'src/app/services/cars.service';
import { doc } from '@angular/fire/firestore';
import { getDownloadURL, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage'

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {

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
      file: ["",[Validators.required]]
    });
  }

  ngOnInit(): void {
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
    
        const infoDataCar: DataCars = {
          carBrand: this.form.get("carBrand")?.value,
         
          url: url

    
          }
    
          this.infoCar = infoDataCar;
         this.isProcessing= true
         console.log(this.infoCar);
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
