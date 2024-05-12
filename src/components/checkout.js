import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
//import { addShipping } from './actions/cartActions'

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      email: "",
      address: "",
    };
  }

  render() {
    const handleChange = (event) => {
      this.setState({ name: event.target.value });
    };
    const handleChange2 = (event) => {
      this.setState({ email: event.target.value });
    };
    const handleChange3 = (event) => {
      this.setState({ address: event.target.value });
    };
    const onSubmitHandler = () => {
      var data = {};
      data.order = this.props.addedItems;
      data.name = this.state.name;
      data.email = this.state.email;
      data.addess = this.state.address;
      axios.post("https://swadapp.onrender.com/getorders", data);
      this.props.history.push("/");
    };
    return (
      <div className="my-5">
        <div className="container shadow">
          <div className="overflow-hidden py-5">
            <div className="row text-center align-items-center ">
              <div className="col-12 col-md-4 mx-2">
                <div class="form-group">
                  <h5>Name</h5>
                  <input
                    type="Name"
                    className="form-control"
                    placeholder="Enter your name "
                    onChange={handleChange}
                  ></input>
                  <h5>Email address</h5>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email "
                    onChange={handleChange2}
                  ></input>
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <h5 for="exampleFormControlTextarea1">Address</h5>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Enter your address"
                    onChange={handleChange3}
                  ></textarea>
                </div>
              </div>
              <div className="col-12 col-md-7  text-end ">
                <h4 className="text-monospace">Total:&nbsp;</h4>
                <h1 className="font-weight-bold"> $ {this.props.total} </h1>
              </div>
            </div>
          </div>
          <Link to="/cart">
            <button type="button" className="btn btn-outline-danger mx-5 my-5">
              <h4>Edit Your order</h4>
            </button>
          </Link>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => onSubmitHandler()}
          >
            <h4>Place Order</h4>
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    total: state.total,
  };
};

export default connect(mapStateToProps)(Checkout);
