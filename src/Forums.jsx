import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

function Forum(props) {
  const d = new Date(props.forum.id);
  return (
    <div className='forum-item bg-light'>
      <div className='d-flex flex-row justify-content-between'>
        <div>
          <h3 className='forum-title'>{props.forum.title}</h3>
          <p>{`${props.forum.author}, ${d.toLocaleString()}`}</p>
        </div>
        <button
          className='remove-btn btn btn-danger'
          onClick={() => {
            props.delete(props.forum.id);
          }}>
          Remove
        </button>
      </div>

      <p className='forum-body'>{props.forum.body}</p>
    </div>
  );
}

export default function Forums() {
  const [forums, setForums] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      body: "",
    },
    onSubmit(values) {
      addForum({
        title: values.title,
        author: values.author,
        body: values.body,
      });
    },
    validate() {
      const errors = {};
      const titleLength = formik.values.title.length;
      const author = formik.values.author;
      const bodyLength = formik.values.body.length;
      if (titleLength < 10 || titleLength > 100) {
        errors.title = "Min 10 characters and Max 100";
      }
      if (!author.match(/^[0-9a-zA-Z]+$/)) {
        errors.author = "Only alphanumeric";
      }
      if (author.length < 5 || author.length > 50) {
        errors.author = "Min 5 and Max 100";
      }
      if (bodyLength < 50 || bodyLength > 500) {
        errors.body = "Min 50 characters and Max 500";
      }

      return errors;
    },
  });

  const loadForums = () => {
    axios.get("/forums").then((res) => {
      setForums(res.data);
    });
  };

  useEffect(() => {
    loadForums();
  }, []);

  const deleteAll = () => {
    axios.get("/forums/delete_all").then((res) => {
      loadForums();
    });
  };

  const addForum = (forumItem) => {
    const doc = Date.now();
    const forum = {
      id: doc,
      title: forumItem.title,
      author: forumItem.author,
      date: doc,
      body: forumItem.body,
    };
    axios
      .post("/forums/add_product", forum)
      .then((response) => {
        loadForums();
      })
      .catch((error) => {
        alert(`Error occured while adding forum: ${error}`);
      });
  };

  const deleteForum = (id) => {
    axios.get(`/forums/delete/${id}`).then((res) => {
      loadForums();
    });
  };
  return (
    <div className='home-container'>
      <div className='form-container'>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className='form-group'>
            <input
              type='text'
              name='title'
              className='form-control'
              placeholder='Title'
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <p className='validation-error'>
              {formik.errors.title ? formik.errors.title : null}
            </p>
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='author'
              className='form-control'
              placeholder='Author'
              onChange={formik.handleChange}
              value={formik.values.author}
            />
            <p className='validation-error'>
              {formik.errors.author ? formik.errors.author : null}
            </p>
          </div>
          <div className='form-group'>
            <textarea
              name='body'
              className='form-control'
              onChange={formik.handleChange}
              value={formik.values.body}
              placeholder='Forum Description'
            />
            <p className='validation-error'>
              {formik.errors.body ? formik.errors.body : null}
            </p>
          </div>
          <div className='d-flex flex-row justify-content-between'>
            <input
              type='submit'
              className='btn btn-success'
              value='Add Forum'
            />
          </div>
        </form>
      </div>
      <div className='text-center'>
        <h1 className='text-light'>Forums List</h1>
        {forums.length > 0 ? (
          <div>
            <div className='forums-container'>
              {forums.map((forum) => {
                return (
                  <Forum key={forum.id} forum={forum} delete={deleteForum} />
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
            No forums available <br />
            Please add forums to test the application
          </h5>
        )}
      </div>
    </div>
  );
}
