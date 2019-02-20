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

    this.menu = [];
    this.dishTypes = dishTypes;
  }

  getDishTypes(){
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

    num = this.customers[0].customernum;
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
    const url = `${BASE_URL}/recipes/search`;
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

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}
const dishTypes = ["All", "main course", "side dish", "dessert", "appetizer", "salad", "bread",
    "breakfast", "soup", "beverage", "sauce", "drink"];

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
