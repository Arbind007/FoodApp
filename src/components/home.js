import React from "react";
import "../components/home.css"; // Ensure this file path is correct
import { connect } from "react-redux";
import { addToCart } from "./actions/cartActions";
import { useOktaAuth } from '@okta/okta-react';

const Home = (props) => {
  const { authState } = useOktaAuth();
  const isAuthenticated = authState && authState.isAuthenticated;
  const userName = isAuthenticated ? authState.idToken.claims.name : null;

  const handleClick = (id) => {
    props.addToCart(id);
  };

  let itemList = props.items.map((item) => (
    <div className="col-12 col-md-4 py-4" key={item.id}>
      <div className="card-body">
        <div className="bg-image overflow-hidden" style={{ width: 400, height: 400 }}>
          <img
            className="img-fluid zoom"
            src={item.img}
            alt={item.title}
            style={{ width: 400, height: 400 }}
          />
        </div>
        <h4 className="card-title">{item.title}</h4>
        <h6>Price: ${item.price}</h6>
        <p>{item.desc}</p>
        {isAuthenticated && (
          <button
            type="button"
            className="btn pmd-btn-raised pmd-ripple-effect btn-danger waves-effect"
            onClick={() => handleClick(item.id)}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <div style={{ backgroundColor: "white" }}>
      {isAuthenticated && <h3 style={{marginRight:'60%'}}>Welcome, {userName}!</h3>}
      <div className="container text-center py-2 overflow-hidden">
        <h2 className="text-center" style={{marginTop:'2%',marginBottom:'-4%'}}>Our items</h2>
        <div className="row my-4 pt-4">{itemList}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  total: state.quantity,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => dispatch(addToCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
