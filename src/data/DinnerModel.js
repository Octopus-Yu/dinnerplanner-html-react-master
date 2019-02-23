import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/19";
const httpOptions = {
  headers: { "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767" }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
this.dishes = [];
    this.menu = [];
    this.dishTypes = dishTypes;
    this.rootURL="";
  }

  getDishTypes() {
    return this.dishTypes;
  }
  getFullMenu() {
    return this.menu;
  }

  getDishPrice(id) {
    var dsh = this.getMenuDish(id);
    console.log(dsh);

    var totalDishPrice = 0;
    var num = 0;
    //console.log(dsh.ingredients);
    for (let ingredient of dsh.ingredients) {

      totalDishPrice += 1;
    }

    num = this.getNumberOfGuests();
    return totalDishPrice * num;

  }

  getTotalMenuPrice() {
    //TODO Lab 1
    var totalPrice = 0;
    for (let dsh of this.menu) {

      totalPrice += this.getDishPrice(dsh.id)

    }
    return totalPrice;
  }

  addDishToMenu(id) {
    this.menu.push(this.getDish(id));
    this.notifyObservers("sidebar");

  }


  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search?number=12`;
    return fetch(url, httpOptions)
      .then(this.processResponse)
      // .then(data => {
      //   this.dishes = data.results;
      //   //console.log(this.dishes);
      //   this.urlRoot = data.baseUri;
      //   //console.log(this.urlRoot);
      // })
      // .then(() => {
      //   this.notifyObservers();
      // })
      ;
  }

  getSearchDishes(type, filter) {
    const url = `${BASE_URL}/recipes/search?number=12&type=${type}&query=${filter}`;
    return fetch(url, httpOptions)
      .then(this.processResponse)
      ;
  }



  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  getSelectedInformation(id) {
    const url = `${BASE_URL}/recipes/${id}/information`;
    return fetch(url, httpOptions)
      .then(this.processResponse)
      ;
    
      // .then(data => {
      //   this.getDish(id).ingredients = data.extendedIngredients;
      //   this.getDish(id).description = data.instructions;
      // })
      // .then(() => this.notifyObservers())
      // .catch(() => {
      //   console.log("error to get the web data")
      // });

  }

  //function that returns a dish of specific ID
  getDish(id) {
    for (let dsh of this.dishes) {
      if (dsh.id == id) {
        return dsh;
      }
    }
    return undefined;
  }
  getMenuDish(id) {

    for (let dsh of this.menu) {
      if (dsh.id == id) {
        return dsh;

      }
    }
    return undefined;
  }


  getDishid(dshName) {
    for (let dsh of this.dishes) {
      if (dsh.title == dshName) {
        return dsh.id;
      }
    }
    return undefined;
  }
}
const dishTypes = ["All", "main course", "side dish", "dessert", "appetizer", "salad", "bread",
  "breakfast", "soup", "beverage", "sauce", "drink"];
  

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
