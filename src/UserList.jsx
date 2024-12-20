import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Button, Pagination } from '@mui/material';
import api from './api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/users?page=${currentPage}`);
                setUsers(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container style={{ marginTop: '50px', backgroundColor: 'gray', padding: '10px' }}>
            <Paper style={{ width: '500px', margin: '0 auto', backgroundColor: 'red', padding: '10px' }}>
                <Table style={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'green' }}>ID</TableCell>
                            <TableCell style={{ color: 'green' }}>Name</TableCell>
                            <TableCell style={{ color: 'green' }}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} style={{ backgroundColor: 'yellow' }}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="secondary"
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
        </Container>
    );
};

export default UserList;
