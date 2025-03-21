import { LightningElement,track,wire } from 'lwc';
import fetchsqm from '@salesforce/apex/vetrotech_fy.getSqm';
import fetchindsqm from '@salesforce/apex/vetrotech_fy.getindSqm';
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//import VetrotechSharing from '@salesforce/schema/VetrotechSharing__c.KAM__c';

export default class VetrotechFY_Values extends LightningElement {

    picklistValues=[];
    @track data = [];
    @track data1 = [];
    @track filterddata = [];
    @track Columns = ['PY 60','PY 160','KER 120','CFDL 120','CFL 120','INDIA 120','OUTSIDE 60','CONTROFLAM 30','CONTROFLAM 60','CONTROFLAM 120']
    year = new Date().getFullYear();
    Title = 'Vetrotech '+ this.year +' FY Volumes - in Square Meters';
    
    connectedCallback(){
        fetchsqm()
        
        .then((result) =>{
             // console.log('data'+JSON.stringify(result));
              this.data = result;
              this.data = this.data.map(row => {
                return{...row,TotalE:(row.PY60+row.PY160+row.KER120).toFixed(2),TotalEW:(row.CFDL120+row.CFL120).toFixed(2),TotalVetro:(row.INDIA120+row.OUTSIDE120).toFixed(2),
                       TotalEI:(row.CONT30+row.CONT60+row.CONT120).toFixed(2),TotalMono:(row.PY60+row.PY160+row.KER120+row.CFDL120+row.CFL120+
                       row.INDIA120+row.OUTSIDE120+row.CONT30+row.CONT60+row.CONT120).toFixed(2),

                }
             });
             this.data = this.data.map(row => {
                return{...row,Eprsnt:row.TotalE==0?0:((row.TotalE/row.TotalMono)*100).toFixed(1),EWprsnt:row.TotalEW==0?0:((row.TotalEW/row.TotalMono)*100).toFixed(1),Vetroprsnt:row.TotalVetro==0?0:((row.TotalVetro/row.TotalMono)*100).toFixed(1),
                      Monoprsnt:100,PY60prsnt:row.PY60==0?0:((row.PY60/row.TotalMono)*100).toFixed(1),PY160prsnt:row.PY160==0?0:((row.PY160/row.TotalMono)*100).toFixed(1),KER120prsnt:row.KER120==0?0:((row.KER120/row.TotalMono)*100).toFixed(1),
                      CFDL120prsnt:row.CFDL120==0?0:((row.CFDL120/row.TotalMono)*100).toFixed(1),CFL120prsnt:row.CFL120==0?0:((row.CFL120/row.TotalMono)*100).toFixed(1),INDIA120prsnt:row.INDIA120==0?0:((row.INDIA120/row.TotalMono)*100).toFixed(1),
                      OUTSIDE120prsnt:row.OUTSIDE120==0?0:((row.OUTSIDE120/row.TotalMono)*100).toFixed(1),CONT30prsnt:row.CONT30==0?0:((row.CONT30/row.TotalMono)*100).toFixed(1),CONT60prsnt:row.CONT60==0?0:((row.CONT60/row.TotalMono)*100).toFixed(1),
                      CONT120prsnt:row.CONT120==0?0:((row.CONT120/row.TotalMono)*100).toFixed(1),EIprsnt:row.TotalEI==0?0:((row.TotalEI/row.TotalMono)*100).toFixed(1),TotalEW:Math.round(row.TotalEW)
                }
             });
              console.log('data2'+JSON.stringify(this.data));
        })
         .catch((error)=>{
              console.log('error'+error);
         })
         this.indsqm();
    }    

    indsqm(){
    fetchindsqm()
     
    .then(result =>{
          this.data1 = result;
          this.data1 = this.data1.map(row => {
               return{...row,TotalE:(row.PY60+row.PY160+row.KER120).toFixed(2),TotalEW:(row.CFDL120+row.CFL120).toFixed(2),TotalVetro:(row.INDIA120+row.OUTSIDE120).toFixed(2),
                      TotalEI:(row.CONT30+row.CONT60+row.CONT120).toFixed(2),TotalMono:(row.PY60+row.PY160+row.KER120+row.CFDL120+row.CFL120+
                      row.INDIA120+row.OUTSIDE120+row.CONT30+row.CONT60+row.CONT120).toFixed(2),

               }
            });
            this.data1 = this.data1.map(row => {
               return{...row,Eprsnt:row.TotalE==0?0:((row.TotalE/row.TotalMono)*100).toFixed(1),EWprsnt:row.TotalEW==0?0:((row.TotalEW/row.TotalMono)*100).toFixed(1),Vetroprsnt:row.TotalVetro==0?0:((row.TotalVetro/row.TotalMono)*100).toFixed(1),
                     Monoprsnt:100,PY60prsnt:row.PY60==0?0:((row.PY60/row.TotalMono)*100).toFixed(1),PY160prsnt:row.PY160==0?0:((row.PY160/row.TotalMono)*100).toFixed(1),KER120prsnt:row.KER120==0?0:((row.KER120/row.TotalMono)*100).toFixed(1),
                     CFDL120prsnt:row.CFDL120==0?0:((row.CFDL120/row.TotalMono)*100).toFixed(1),CFL120prsnt:row.CFL120==0?0:((row.CFL120/row.TotalMono)*100).toFixed(1),INDIA120prsnt:row.INDIA120==0?0:((row.INDIA120/row.TotalMono)*100).toFixed(1),
                     OUTSIDE120prsnt:row.OUTSIDE120==0?0:((row.OUTSIDE120/row.TotalMono)*100).toFixed(1),CONT30prsnt:row.CONT30==0?0:((row.CONT30/row.TotalMono)*100).toFixed(1),CONT60prsnt:row.CONT60==0?0:((row.CONT60/row.TotalMono)*100).toFixed(1),
                     CONT120prsnt:row.CONT120==0?0:((row.CONT120/row.TotalMono)*100).toFixed(1),EIprsnt:row.TotalEI==0?0:((row.TotalEI/row.TotalMono)*100).toFixed(1)
               }
            });
            console.log('data1'+JSON.stringify(this.data1));
            this.data = [...this.data1,...this.data];
     })
     .catch((error)=>{
          console.log('error'+error);
     })
    }
}