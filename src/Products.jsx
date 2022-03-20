import React, { useEffect, useState } from "react";
import axios from "axios";

function Product(props) {
  return (
    <div className='card m-3 text-right'>
      <div className='card-body text-left'>
        <h5 className='card-title'>{props.product.name}</h5>
        <p className='card-text text-muted'>{props.product.description}</p>
        <div className='row'>
          <p className='col card-text'>{props.product.category}</p>
          <p className='col card-text'>{props.product.status}</p>
        </div>
        <div className='d-flex flex-row justify-content-between'>
          <h4 type='button' className='price text-center'>
            {`₹ ${props.product.price}`}
          </h4>
          <button
            type='button'
            className='price text-center btn btn-danger'
            onClick={() => {
              props.delete(props.product.id);
            }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    axios.get("/products").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteAll = () => {
    axios.get("/products/delete_all").then((res) => {
      loadProducts();
    });
  };

  const addProduct = (event) => {
    const producT = {
      id: Date.now(),
      name: event.target.name.value,
      price: parseInt(event.target.price.value),
      category: event.target.category.value,
      status: event.target.status.value,
      desc: event.target.desc.value,
    };
    event.preventDefault();
    axios
      .post("/products/add_product", producT)
      .then((response) => {
        loadProducts();
      })
      .catch((error) => {
        alert(`Error occured while adding Product: ${error}`);
      });
  };

  const deleteProduct = (id) => {
    axios.get(`/products/delete/${id}`).then((res) => {
      loadProducts();
    });
  };

  return (
    <div className='home-container'>
      <div className='form-container'>
        <form onSubmit={addProduct}>
          {/* <h1 className='heading'>Add Product</h1> */}
          <div className='form-group'>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              name='price'
              className='form-control'
              placeholder='Price'
              required
            />
          </div>
          <div className='form-group'>
            <select name='category' className='form-select'>
              <option value='NA'>Select Category</option>
              <option value='Toys'>Toys</option>
              <option value='Cloths'>Cloths</option>
              <option value='Food'>Food</option>
            </select>
          </div>
          <div className='form-group'>
            <select name='status' className='form-select'>
              <option value='NA'>Select Status</option>
              <option value='Available'>Available</option>
              <option value='Not Available'>Not Available</option>
            </select>
          </div>
          <div className='form-floating'>
            <textarea required name='desc' className='form-control' />
            <label htmlFor='floatingTextarea2'>Description</label>
          </div>
          <div className='d-flex flex-row justify-content-between'>
            <input
              type='submit'
              className='btn btn-success'
              value='Add Product'
            />
          </div>
        </form>
      </div>
      <div className='text-center'>
        <h1 className='text-light text-center'>Products</h1>
        {products.length > 0 ? (
          <div>
            <div className='products-container'>
              {products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    delete={deleteProduct}
                  />
                );
              })}
            </div>
            <input
              type='button'
              className='m-4 btn btn-danger'
              value='Delete All'
              onClick={deleteAll}
            />
          </div>
        ) : (
          <h5 className='text-light'>
            No products available <br />
            Please add products to test the application
          </h5>
        )}
      </div>
    </div>
  );
}
