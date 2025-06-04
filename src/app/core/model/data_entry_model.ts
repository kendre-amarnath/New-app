export interface DataEntry {
    fileNumber: number;       
    firstName: string;
    middleName?: string;    
    country: string;
    city: string;
    dateOfBirth: string; 
    gender: 'Male' | 'Female' | 'Other'; 
  }