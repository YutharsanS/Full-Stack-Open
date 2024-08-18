import { useState } from "react";

const Header = ({name}) => {
    return <h2>{name}</h2>
  }
  
  const Part = ({name, exercises}) => {    
    return <p>{name} {exercises}</p>
  }
  
  const Total = ({parts}) => {
    return (
        <p>
            <b>Total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b>
        </p>
    );
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    );
  }

const Course = ({course}) => {
    return (
        <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    );
}

export default Course;