import React from 'react';
import { useNavigate } from 'react-router-dom'

const UsersTable = ({ users, type }) => {
  const navigate = useNavigate();

  return (
      <>
        {users.map((user) => (
			<tr key={user.id} onClick={()=>navigate(`/${type}/${user.id}`)}>
            <td>{user.id}</td>
            <td>{user.first_name}</td> 
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.phone_number}</td>
            <td> <input type="checkbox" name="isActive" defaultChecked={user.is_active}/></td>
        </tr>
        ))}
      </>
  );
};

export default UsersTable;