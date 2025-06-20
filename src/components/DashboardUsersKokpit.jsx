import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import api from '../api/axios';
import { useSnackbar } from '../context/SnackbarContext';

export default function DashboardUsersKokpit() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const { showSnackbar } = useSnackbar();

  const ITEMS_PER_PAGE = 10; // Sayfa başına gösterilecek kullanıcı sayısı

  // Kullanıcıları getir
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?page=${page}&limit=${ITEMS_PER_PAGE}`);
      
      const usersData = response.data?.users || [];
      setUsers(Array.isArray(usersData) ? usersData : []);
      setTotalUsers(response.data?.total || 0);
      setTotalPages(Math.ceil((response.data?.total || 0) / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Kullanıcılar yüklenirken hata:', error);
      showSnackbar('Kullanıcılar yüklenirken bir hata oluştu.', 'error');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı sil
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await api.delete(`/profile/${selectedUser.id}`);
      showSnackbar('Kullanıcı başarıyla silindi.', 'success');
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Kullanıcı silinirken hata:', error);
      showSnackbar('Kullanıcı silinirken bir hata oluştu.', 'error');
    }
  };

  // Silme dialog'unu aç
  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  // Silme dialog'unu kapat
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  // Sayfa değiştirme
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchUsers(newPage);
  };

  // Rol değiştirme
  const handleRoleChange = async (user) => {
    const newRole = user.role === 2 ? 1 : 2; // Admin ise kullanıcı yap, kullanıcı ise admin yap
    const roleText = newRole === 2 ? 'admin' : 'kullanıcı';
    
    try {
      await api.put('/admin/update-user-role', {
        role: newRole,
        user_id: user.id
      });
      
      showSnackbar(`Kullanıcı başarıyla ${roleText} yapıldı.`, 'success');
      
      // Kullanıcı listesini güncelle
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, role: newRole } : u
      ));
    } catch (error) {
      console.error('Rol değiştirilirken hata:', error);
      showSnackbar('Rol değiştirilirken bir hata oluştu.', 'error');
    }
  };

  // Rol badge'ini render et
  const renderRoleBadge = (user) => {
    const isAdmin = user.role === 2;
    
    return (
      <Chip
        label={isAdmin ? 'Admin' : 'Kullanıcı'}
        size="small"
        color={isAdmin ? 'error' : 'primary'}
        variant="outlined"
        icon={isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${
          isAdmin ? 'border-red-500 text-red-600' : 'border-blue-500 text-blue-600'
        }`}
        onClick={() => handleRoleChange(user)}
      />
    );
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box className="flex items-center gap-3 mb-6">
        <PersonIcon sx={{ fontSize: 32, color: '#dc143c' }} />
        <Typography variant="h5" className="font-semibold">
          Kullanıcı Listesi
        </Typography>
      </Box>

      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold">Ad Soyad</TableCell>
              <TableCell className="font-semibold">E-posta</TableCell>
              <TableCell className="font-semibold">Telefon</TableCell>
              <TableCell className="font-semibold">Rol</TableCell>
              <TableCell className="font-semibold text-center">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                  Henüz kullanıcı bulunmuyor.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Box className="flex items-center gap-2">
                      <PersonIcon sx={{ fontSize: 20, color: '#dc143c' }} />
                      <Typography>
                        {user.first_name} {user.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone_number || '-'}</TableCell>
                  <TableCell>{renderRoleBadge(user)}</TableCell>
                  <TableCell className="text-center">
                    <IconButton
                      onClick={() => openDeleteDialog(user)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalUsers > 0 && (
        <Box className="flex items-center justify-between mt-6">
          <Typography className="text-gray-600">
            Toplam {totalUsers} kullanıcıdan {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalUsers)} arası gösteriliyor
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Silme Onay Dialog'u */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle className="font-semibold text-red-600">
          Kullanıcı Silme Onayı
        </DialogTitle>
        <DialogContent>
          <Typography>
            <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong> 
            adlı kullanıcıyı silmek istediğinizden emin misiniz?
          </Typography>
          <Typography className="mt-2 text-sm text-gray-600">
            Bu işlem geri alınamaz ve kullanıcının tüm verileri kalıcı olarak silinecektir.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={closeDeleteDialog} className="text-gray-600">
            İptal
          </Button>
          <Button 
            onClick={handleDeleteUser} 
            className="text-white bg-red-500 hover:bg-red-600"
            variant="contained"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
