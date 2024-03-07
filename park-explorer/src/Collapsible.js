import React, { useState } from 'react';

function Collapsible() {
  const [isActive, setIsActive] = useState(false);

  const toggleCollapsible = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`collapsible ${isActive ? 'active' : ''}`} onClick={toggleCollapsible}>
      <button>Toggle</button>
      <div className="content" style={{ display: isActive ? 'block' : 'none' }}>
        Collapsible content goes here
      </div>
    </div>
  );
}

export default Collapsible;