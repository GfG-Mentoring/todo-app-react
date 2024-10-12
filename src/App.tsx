import React, { useContext, useState } from 'react';
import { PeopleDataProvider, PeoplesContext } from './store';

function App() {
  const [people] = useContext(PeoplesContext);

  return (
    <>
      {people.map((person, index) => (
        <Card key={index} index={index} />
      ))}
    </>
  );
}

export default App;

function Card(props) {
  const [people] = useContext(PeoplesContext);

  const person = people[props.index];

  const [edit, setEdit] = useState(false);

  if (edit) {
    return (
      <EditCardComponent index={props.index} setEdit={setEdit} edit={edit} />
    );
  }

  return (
    <div
      style={{
        border: '1px solid white',
        padding: '0.6rem',
      }}
    >
      <button onClick={() => setEdit(!edit)}>✏️</button>
      <h2>{person.title ? person.title : 'Unknown person'}</h2>
      <p>{person.description ? person.description : 'no description'}</p>
    </div>
  );
}

const EditCardComponent = (props) => {
  const [people, , editPerson] = useContext(PeoplesContext);

  const [cardData, setCardData] = useState({
    title: people[props.index].title,
    description: people[props.index].description,
  });

  const changeInputValues = (inputType, value) => {
    setCardData({ ...cardData, [inputType]: value });
  };
  return (
    <div
      style={{
        border: '1px solid white',
        padding: '0.6rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      <label>
        <p>Title: </p>
        <input
          value={cardData.title}
          onChange={(e) => changeInputValues('title', e.target.value)}
        />
      </label>
      <label>
        <p>Description: </p>
        <input
          value={cardData.description}
          onChange={(e) => changeInputValues('description', e.target.value)}
        />
      </label>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <button onClick={() => props.setEdit((prev) => !prev)}>✏️</button>
        <button
          onClick={() => {
            editPerson(cardData.title, cardData.description, props.index);
            props.setEdit(false);
          }}
        >
          save
        </button>
      </div>
    </div>
  );
};
