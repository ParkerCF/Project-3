import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SKILL } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SkillForm = ({ profileId }) => {
  const [skill, setSkill] = useState({name: '', description: '', price: ''});

  const [addSkill, { error }] = useMutation(ADD_SKILL);

 const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setSkill({
      ...skill,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const conversionSkill = {...skill, price: parseFloat(skill.price)};
    try {
      const data = await addSkill({
        variables: { profileId, skill:conversionSkill },
      });

      setSkill('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>List another item for sale.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Product Name"
              name="name"
              value={skill.name}
              className="form-input w-100"
              onChange={(event) => handleInputChange(event)}
            />
            <input
              placeholder="Price"
              name="price"
              value={skill.price}
              className="form-input w-100"
              onChange={(event) => handleInputChange(event)}
            />
            <input
              placeholder="Description"
              name="description"
              value={skill.description}
              className="form-input w-100"
              onChange={(event) => handleInputChange(event)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              List Item
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to list an item for sale. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SkillForm;