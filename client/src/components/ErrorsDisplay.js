import React from 'react';

const ErrorsDisplay = ({ errors }) => {
    return (
      <div>
        {errors.length > 0 && (
            <div className="validation--errors">
                <h3 className="validation--errors">Validation Errors</h3>
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
        )}
      </div>
    );
  };

  export default ErrorsDisplay;