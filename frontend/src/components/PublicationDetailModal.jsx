import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, CircularProgress, Alert, Chip, Card, CardContent, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { publicationService } from '../api/publicationService';
import { authorService } from '../api/authorService';
const PublicationDetailModal = ({ open, publication, onClose, onStatusChange, isLoading }) => {
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  useEffect(() => { if (open && publication) { setSelectedStatus(publication.status); fetchAuthor(publication.authorId); } }, [open, publication]);
  const fetchAuthor = async (authorId) => {
    try { setLoadingAuthor(true); const data = await authorService.getAuthorById(authorId); setAuthor(data); }
    catch (err) { }
    finally { setLoadingAuthor(false); }
  };
  const handleStatusChange = async () => { if (selectedStatus !== publication.status) { await onStatusChange(publication.id, selectedStatus); } };
  const getStatusColor = (status) => ({ DRAFT: 'default', IN_REVIEW: 'warning', APPROVED: 'success', PUBLISHED: 'primary', REJECTED: 'error' }[status] || 'default');
  const getStatusLabel = (status) => ({ DRAFT: 'Borrador', IN_REVIEW: 'En Revisión', APPROVED: 'Aprobado', PUBLISHED: 'Publicado', REJECTED: 'Rechazado' }[status] || status);
  return (<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth><DialogTitle>Detalle de Publicación</DialogTitle><DialogContent>{publication && (<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}><Card><CardContent><Typography variant="h6" sx={{ fontWeight: 'bold' }}>{publication.title}</Typography><Chip label={getStatusLabel(publication.status)} color={getStatusColor(publication.status)} size="small" /></CardContent></Card>{loadingAuthor ? <CircularProgress /> : author && <Card><CardContent><Typography variant="subtitle2">Autor</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><PersonIcon fontSize="small" /><Typography><strong>{author.name}</strong></Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><EmailIcon fontSize="small" /><Typography>{author.email}</Typography></Box></CardContent></Card>}<Divider /><FormControl fullWidth disabled={isLoading}><InputLabel>Estado</InputLabel><Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} label="Estado"><MenuItem value="DRAFT">Borrador</MenuItem><MenuItem value="IN_REVIEW">En Revisión</MenuItem><MenuItem value="APPROVED">Aprobado</MenuItem><MenuItem value="PUBLISHED">Publicado</MenuItem><MenuItem value="REJECTED">Rechazado</MenuItem></Select></FormControl></Box>)}</DialogContent><DialogActions><Button onClick={onClose}>Cerrar</Button>{selectedStatus !== publication?.status && <Button onClick={handleStatusChange} variant="contained">Actualizar</Button>}</DialogActions></Dialog>);
};
export default PublicationDetailModal;
