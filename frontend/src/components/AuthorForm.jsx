import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, CircularProgress } from '@mui/material';
const AuthorForm = ({ open, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = async () => { if (!formData.name.trim() || !formData.email.trim()) { alert('Por favor completa todos los campos'); return; } await onSubmit(formData); setFormData({ name: '', email: '' }); };
  const handleClose = () => { setFormData({ name: '', email: '' }); onClose(); };
  return (<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth><DialogTitle sx={{ fontWeight: 'bold' }}>Crear Nuevo Autor</DialogTitle><DialogContent><Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}><TextField label="Nombre del Autor" name="name" value={formData.name} onChange={handleChange} fullWidth variant="outlined" placeholder="Ej: Juan Pérez" disabled={isLoading} /><TextField label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth variant="outlined" placeholder="Ej: juan@example.com" disabled={isLoading} /></Box></DialogContent><DialogActions sx={{ padding: 2 }}><Button onClick={handleClose} disabled={isLoading}>Cancelar</Button><Button onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading}>{isLoading ? 'Creando...' : 'Crear Autor'}</Button></DialogActions></Dialog>);
};
export default AuthorForm;
