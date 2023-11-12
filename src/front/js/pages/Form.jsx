import React from "react";


export const Form = () => {
  return (
    <div className="bg-dark text-light">
      <div className="container ">
        <main>
          <div className="row g-6">
            <div className="col-md-4 col-lg-3 ">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-light">Your cart</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Product name</h6>
                    <small className="text-body-secondary">Brief description</small>
                  </div>
                  <span className="text-body-secondary">20€</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Second product</h6>
                    <small className="text-body-secondary">Brief description</small>
                  </div>
                  <span className="text-body-secondary">15€</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Third item</h6>
                    <small className="text-body-secondary">Brief description</small>
                  </div>
                  <span className="text-body-secondary">10€</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (€)</span>
                  <strong>45€</strong>
                </li>
              </ul>
            </div>
            <div className="col-md-5 col-lg-6">
              <h4 className="mb-3">Billing address</h4>
              <form>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder=""/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input type="text" className="form-control" id="username" placeholder="Username" required="" />
                      <div className="invalid-feedback">
                        Your username is required.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email <span className="text-body-secondary"></span></label>
                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">Country</label>
                    <select className="form-select" id="country" required="">
                      <option value="">Choose...</option>
                      <option>United States</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">State</label>
                    <select className="form-select" id="state" required="">
                      <option value="">Choose...</option>
                      <option>California</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="" required="" />
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <h4 className="mb-3">Payment</h4>
                <div className="my-3">
                  <div className="form-check">
                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked="" required="" />
                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                  </div>
                  <div className="form-check">
                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required="" />
                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                  </div>
                  <div className="form-check">
                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required="" />
                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                  </div>
                </div>
                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                    <small className="text-body-secondary">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <button className="w-30 btn btn-secondary btn m-5" type="submit">Continue to the payment</button>
                <button className="w-30 btn btn-secondary btn " type="submit">Cancel the payment</button>
              </form>
            </div>
          </div>
        </main>
        <footer className="my-5 pt-5 text-body-secondary text-center text-small">
          <p className="mb-1">© 2023 LiteraryInk</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Privacy</a></li>
            <li className="list-inline-item"><a href="#">Terms</a></li>
            <li className="list-inline-item"><a href="#">Support</a></li>
          </ul>
        </footer>
      </div>
    </div>
  );
};