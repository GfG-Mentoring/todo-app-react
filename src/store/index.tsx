import { Children, createContext, useState } from 'react';

export const PeoplesContext = createContext([]);

export function PeopleDataProvider(props) {
  const [people, setPeople] = useState([
    { title: 'Jane Doe', description: 'engineer' },
    { title: '', description: 'engineer' },
  ]);

  const editPerson = (title, description, index) => {
    console.log(title, description);
    const newValues = people[index];

    console.log(newValues);

    if (title) {
      newValues.title = title;
    }
    if (description) {
      newValues.description = description;
    }

    people[index] = newValues;

    setPeople(people);
  };

  return (
    <PeoplesContext.Provider value={[people, setPeople, editPerson]}>
      {props.children}
    </PeoplesContext.Provider>
  );
}
