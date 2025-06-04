import { faker } from '@faker-js/faker';

interface Person {
  filenumber: number;
  firstName: string;
  middleName: string;
  country: string;
  city: string;
  Date_of_birth: string;
  Gender: 'Male' | 'Female';
}

function generatePerson(): Person {
  return {
    filenumber: faker.number.int({ min: 100000, max: 999999 }),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    country: faker.location.country(),
    city: faker.location.city(),
    Date_of_birth: faker.date
      .birthdate({ min: 1950, max: 2005, mode: 'year' })
      .toISOString()
      .split('T')[0],
    Gender: faker.helpers.arrayElement(['Male', 'Female']),
  };
}

const people: Person[] = Array.from({ length: 50 }, () => generatePerson());

console.log(JSON.stringify(people, null, 2));
