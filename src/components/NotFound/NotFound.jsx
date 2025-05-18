import { Navigate } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Redirecting to home...</p>
      <Navigate to="/rates" replace />
    </div>
  );
};

export default NotFound;
