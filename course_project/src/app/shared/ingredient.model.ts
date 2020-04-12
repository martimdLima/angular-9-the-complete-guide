export class Ingredient {

    /*
   * In Typescript, constructors can be built in two ways:

     public name: string;
     public amount: number;


     constructor(name: string, amount: number) {
      this.name = name;
      this.amount = amount;
  }
  */

  constructor(public name: string, public amount: number) {
  }
}
