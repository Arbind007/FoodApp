import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
} from "./actions/cartActions";
import { Link } from "react-router-dom";
class Cart extends Component {
  handleRemove = (id) => {
    this.props.removeItem(id);
  };

  handleSubtractQuantity = (id) => {
    this.props.subtractQuantity(id);
  };

  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  };

  redirect = () => {
    if (this.props.quantity !== 0) {
      this.props.history.push("/checkout");
    }
  };

  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <div className="overflow-hidden my-5" key={item.id}>
            <div className="row text-center align-items-center ">
              <div className="col-12 col-md-4">
                <img
                  src={item.img}
                  alt={item.img}
                  className=""
                  style={{ width: 450, height: 400 }}
                />
              </div>
              <div className="col-12 col-md-8">
                <h2>{item.title}</h2>
                <h3>Price: ${item.price}</h3>
                <h4>
                  <Link to="/cart">
                    <i
                      className="fas fa-minus-circle"
                      onClick={() => {
                        this.handleSubtractQuantity(item.id);
                      }}
                    ></i>
                  </Link>
                  &nbsp; Quantity: {item.quantity} &nbsp;
                  <Link to="/cart">
                    <i
                      className="fas fa-plus-circle"
                      onClick={() => {
                        this.handleAddQuantity(item.id);
                      }}
                    ></i>
                  </Link>
                </h4>
                {item.desc}
                <div>
                  <button
                    type="button"
                    className="btn pmd-btn-raised pmd-ripple-effect btn-danger my-2"
                    onClick={() => {
                      this.handleRemove(item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <div className="container shadow my-3">
        <div className="cart">
          <h5>You have ordered:</h5>
          <div>{addedItems}</div>

          <button
            className="btn btn-outline-success my-3"
            onClick={() => {
              this.redirect();
            }}
          >
            <h3>Check Out</h3>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    quantity: state.quantity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id) => {
      dispatch(subtractQuantity(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
