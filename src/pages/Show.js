import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const people = props.people
  console.log(id);
  
  const person = people ? people.find((p) => p._id === id ) : null

  const [ editForm, setEditForm ] = useState(person)

  //stop autoloading 5/17
  const [ isEditing, setIsEditing ] = useState(false)

    useEffect( () => {
      if (person) {
        setEditForm(person)
      }

    }, [])

  // handling form data change
  const handleChange = (e) => {
    setEditForm( {
      ...editForm,
     [e.target.name]: e.target.value 
    })
  }
  
  // handling submit event for edit form
  const handleUpdate = (e) => {
    e.preventDefault()
    props.updatePeople(editForm, person._id)
  }

  const handleEdit = () => {
      setIsEditing(prevState => !prevState)
  }


  const handleDelete = () => {
    props.deletePeople(person._id)
    navigate('/')
  }

  const loaded = () => {
    return (
      <>
        <h1>{person.name}</h1>
        <h2>{person.title}</h2>
        <img 
          className="avatar-image" 
          src={person.image} 
          alt={person.name} 
        />
        {/* to */}
        <button onClick={handleEdit}>{ isEditing ? 'Cancel Edit': 'edit'}</button>
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="person">
      { person ? loaded() : loading() }
      {/* if this AND this is turn no render */}
      { isEditing && 
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    }
    </div>

  )
}

export default Show