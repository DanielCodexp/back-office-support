import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DatosCars } from '../interface/cars-interface';
import { DataCarsRent } from '../interface/dataCarsRent';
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private firetore: Firestore) { }


// Agregar un carro a renta


  addCar(car:DatosCars){
    const carRef = collection(this.firetore, 'car');
    return addDoc(carRef, car);
  }


// Traer usuarios que rentaron y carros rentadao
  getCarsRent(): Observable<DataCarsRent[]> {
    const carRef = collection(this.firetore, 'rent-info');
    return collectionData(carRef, {idField: 'id'}) as Observable<DataCarsRent[]>;
  }

  //Traer autos
  
  getCars(): Observable<DatosCars[]> {
    const carRef = collection(this.firetore, 'car');
    return collectionData(carRef, {idField: 'id'}) as Observable<DatosCars[]>;
  }

  // Traer datos del usuario


   async getOrder(id:string) {
    const carDocRef = doc(this.firetore, "rent-info", id);
    return getDoc(carDocRef)
    .then((doc) => {
      return doc.data()
    })
  }

  //Traer auto seleccionado por el usuario

  async getCarByOrder(id:string) {
    const carDocRef = doc(this.firetore, "car", id);
    return getDoc(carDocRef)
    .then((doc) => {
      return doc.data()
    })
  }


  //Borrar cita
  // deleteCar(car: DatosRequest){
  //   const carDocRef = doc(this.firetore, `car/${car.id}`);
  //   return deleteDoc(carDocRef);
  // }


  //Cambiar estado de auto disponible

  updateAvaible(id: string){
    const carDocRef = doc(this.firetore, "car", id);
 return updateDoc(carDocRef,{
  available: false
 })
  }
}
