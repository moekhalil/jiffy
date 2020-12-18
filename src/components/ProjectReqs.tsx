import React from 'react';

const ProjectRequirments = () => (
  <details>
    <summary>Project Requirements</summary>
    <div className="requirements-checklist">
      <ul>
        {['TypeScript', 'React', 'Redux'].map((li, k) => (
          <li key={li + k}>
            <input id={li + k} defaultChecked type="checkbox"></input>
            <label htmlFor={li + k}>{li} </label>
          </li>
        ))}
      </ul>
    </div>
  </details>
);

export default ProjectRequirments;
