// import React from 'react'

// const TableTest = () => {
//     class UserComponent extends React.Component {
//         state = {
//             users: []
//         };

//         componentDidMount() {
//             fetch('https://3558-1-53-82-154.ngrok-free.app/api/user')
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     this.setState({ users: data });
//                 })
//                 .catch(error => {
//                     console.error('Error fetching users:', error);
//                 });
//         }

//         render() {
//             return (
//                 <div>
//                     <h1>Users</h1>
//                     <ul>
//                         {this.state.users.map(user => (
//                             <li key={user.id}>{user.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             );
//         }
//     }
// }

// export default TableTest