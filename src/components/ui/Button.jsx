import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  to,
  className = '', 
  icon, 
  ...props 
}) => {
  const baseClass = `btn btn-${variant} ${className}`;

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClass} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClass} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {content}
    </button>
  );
};

export default Button;
