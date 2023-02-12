import axios from "axios";
import React, { useEffect } from "react";
import './Main.css'
import { Link } from "react-router-dom";
export default function Main() {
    const [userData, SetuserData] = React.useState([]);

    async function deleteUser(id) {

        if (window.confirm("You want to Delete this user")) {
            const { data } = await axios.delete(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`);
            getData();
            console.log(data)
        }
    }
    async function getData() {
        const { data } = await axios.get(
            "https://blue-journalist-bbrpv.ineuron.app:4000/users"
        );
        SetuserData(data.data);
    }
    useEffect(() => {

        getData();
    }, []);
    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Admin Dashboard</h1>
            <table className="tabel">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.firstName} </td>
                            <td>{item.lastName} </td>
                            <td>{item.phoneNumber} </td>
                            <td>{item.age} </td>
                            <td><Link to={`/update-user/${item._id}`}> <button className="btn" >Update</button></Link> </td>
                            <td><button className="btn" onClick={() => deleteUser(item._id)}>Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ); 
}
