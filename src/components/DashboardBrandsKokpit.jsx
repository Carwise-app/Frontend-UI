import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Box, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  TextField,
  Fab,
  Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../api/axios';
import { useSnackbar } from '../context/SnackbarContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardBrandsKokpit() {
  const [allBrands, setAllBrands] = useState([]); // Tüm markalar
  const [brands, setBrands] = useState([]); // Görüntülenecek markalar
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [addBrandDialogOpen, setAddBrandDialogOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBrands, setTotalBrands] = useState(0);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10; // Sayfa başına gösterilecek marka sayısı

  // Markaları getir
  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/brand/');
      
      let brandsData = [];
      
      if (Array.isArray(response.data)) {
        brandsData = response.data;
      } else if (response.data?.brands && Array.isArray(response.data.brands)) {
        brandsData = response.data.brands;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        brandsData = response.data.data;
      } else if (response.data?.results && Array.isArray(response.data.results)) {
        brandsData = response.data.results;
      } else {
        brandsData = [];
      }
      
      setAllBrands(brandsData);
      setTotalBrands(brandsData.length);
      setTotalPages(Math.ceil(brandsData.length / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Markalar yüklenirken hata:', error);
      showSnackbar('Markalar yüklenirken bir hata oluştu.', 'error');
      setAllBrands([]);
      setBrands([]);
      setTotalBrands(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [showSnackbar, ITEMS_PER_PAGE]);

  // Marka sil
  const handleDeleteBrand = useCallback(async () => {
    if (!selectedBrand) return;

    try {
      await api.delete(`/brand/${selectedBrand.id}`);
      showSnackbar('Marka başarıyla silindi.', 'success');
      setBrands(prev => prev.filter(brand => brand.id !== selectedBrand.id));
      setDeleteDialogOpen(false);
      setSelectedBrand(null);
      navigate(0);
    } catch (error) {
      console.error('Marka silinirken hata:', error);
      showSnackbar('Marka silinirken bir hata oluştu.', 'error');
    }
  }, [selectedBrand, showSnackbar, navigate]);

  // Silme dialog'unu aç
  const openDeleteDialog = useCallback((brand) => {
    setSelectedBrand(brand);
    setDeleteDialogOpen(true);
  }, []);

  // Silme dialog'unu kapat
  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedBrand(null);
  }, []);

  // Marka ekle
  const handleAddBrand = useCallback(async () => {
    if (!newBrandName.trim()) {
      showSnackbar('Marka adı boş olamaz.', 'error');
      return;
    }

    try {
      await api.post('/brand/', {
        name: newBrandName.trim()
      });
      showSnackbar('Marka başarıyla eklendi.', 'success');
      setAddBrandDialogOpen(false);
      setNewBrandName('');
      navigate(0);
    } catch (error) {
      console.error('Marka eklenirken hata:', error);
      showSnackbar('Marka eklenirken bir hata oluştu.', 'error');
    }
  }, [newBrandName, showSnackbar, navigate]);

  // Accordion açma/kapama
  const handleAccordionChange = useCallback((brandId) => (event, isExpanded) => {
    setExpandedBrand(isExpanded ? brandId : null);
  }, []);

  // Sayfa değiştirme
  const handlePageChange = useCallback((event, newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [totalPages, currentPage]);

  // Optimize edilmiş marka listesi
  const brandsList = useMemo(() => {
    return brands.map((brand) => (
      <BrandAccordion
        key={brand.id}
        brand={brand}
        isExpanded={expandedBrand === brand.id}
        onAccordionChange={handleAccordionChange(brand.id)}
        onDelete={openDeleteDialog}
      />
    ));
  }, [brands, expandedBrand, handleAccordionChange, openDeleteDialog]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Client-side pagination için görüntülenecek markaları hesapla
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBrands = allBrands.slice(startIndex, endIndex);
    setBrands(currentBrands);
  }, [allBrands, currentPage, ITEMS_PER_PAGE]);

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box className="flex items-center justify-between mb-6">
        <Box className="flex items-center gap-3">
          <DirectionsCarIcon sx={{ fontSize: 32, color: '#dc143c' }} />
          <Typography variant="h5" className="font-semibold">
            Marka ve Seri Yönetimi
          </Typography>
        </Box>
        <Fab
          color="primary"
          size="small"
          onClick={() => setAddBrandDialogOpen(true)}
          className="!bg-[#dc143c] hover:bg-[#b01030]"
        >
          <AddIcon />
        </Fab>
      </Box>

      {brands.length === 0 ? (
        <Box className="py-8 text-center text-gray-500">
          Henüz marka bulunmuyor.
        </Box>
      ) : (
        <Box className="space-y-4">
          {brandsList}
        </Box>
      )}

      {/* Pagination */}
      {totalBrands > 0 && totalPages > 1 && (
        <Box className="flex items-center justify-between mt-6">
          <Typography className="text-gray-600">
            Toplam {totalBrands} markadan {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalBrands)} arası gösteriliyor
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            disabled={loading}
          />
        </Box>
      )}

      {/* Silme Onay Dialog'u */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle className="font-semibold text-red-600">
          Marka Silme Onayı
        </DialogTitle>
        <DialogContent>
          <Typography>
            <strong>{selectedBrand?.name}</strong> 
            markasını silmek istediğinizden emin misiniz?
          </Typography>
          <Typography className="mt-2 text-sm text-gray-600">
            Bu işlem geri alınamaz ve markanın tüm verileri kalıcı olarak silinecektir.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={closeDeleteDialog} className="text-gray-600">
            İptal
          </Button>
          <Button 
            onClick={handleDeleteBrand} 
            className="text-white bg-red-500 hover:bg-red-600"
            variant="contained"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>

      {/* Marka Ekleme Dialog'u */}
      <Dialog open={addBrandDialogOpen} onClose={() => setAddBrandDialogOpen(false)}>
        <DialogTitle className="font-semibold text-gray-800">
          Yeni Marka Ekle
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Marka Adı"
            type="text"
            fullWidth
            variant="outlined"
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddBrand();
              }
            }}
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setAddBrandDialogOpen(false)} className="text-gray-600">
            İptal
          </Button>
          <Button 
            onClick={handleAddBrand} 
            className="text-white bg-[#dc143c] hover:bg-[#b01030]"
            variant="contained"
          >
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Optimize edilmiş marka accordion komponenti
const BrandAccordion = React.memo(({ brand, isExpanded, onAccordionChange, onDelete }) => {
  const [addSeriesDialogOpen, setAddSeriesDialogOpen] = useState(false);
  const [newSeriesName, setNewSeriesName] = useState('');
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Seri ekle
  const handleAddSeries = useCallback(async () => {
    if (!newSeriesName.trim()) {
      showSnackbar('Seri adı boş olamaz.', 'error');
      return;
    }

    try {
      await api.post(`/brand/${brand.id}/series`, {
        name: newSeriesName.trim()
      });
      showSnackbar('Seri başarıyla eklendi.', 'success');
      setAddSeriesDialogOpen(false);
      setNewSeriesName('');
      navigate(0);
    } catch (error) {
      console.error('Seri eklenirken hata:', error);
      showSnackbar('Seri eklenirken bir hata oluştu.', 'error');
    }
  }, [newSeriesName, brand.id, showSnackbar, navigate]);

  return (
    <>
      <Accordion 
        expanded={isExpanded}
        onChange={onAccordionChange}
        className="rounded-lg shadow-md"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="transition-colors bg-gray-50 hover:bg-gray-100"
        >
          <Box className="flex items-center justify-between w-full pr-4">
            <Box className="flex items-center gap-3">
              <DirectionsCarIcon sx={{ fontSize: 24, color: '#dc143c' }} />
              <Typography className="text-lg font-semibold">
                {brand.name}
              </Typography>
              <Chip 
                label={`${brand.series?.length || 0} Seri`} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
            <Box className="flex items-center gap-1">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setAddSeriesDialogOpen(true);
                }}
                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                size="small"
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(brand);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails className="bg-white">
          <BrandSeries brandId={brand.id} brandName={brand.name} series={brand.series} />
        </AccordionDetails>
      </Accordion>

      {/* Seri Ekleme Dialog'u */}
      <Dialog open={addSeriesDialogOpen} onClose={() => setAddSeriesDialogOpen(false)}>
        <DialogTitle className="font-semibold text-gray-800">
          {brand.name} Markasına Yeni Seri Ekle
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Seri Adı"
            type="text"
            fullWidth
            variant="outlined"
            value={newSeriesName}
            onChange={(e) => setNewSeriesName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddSeries();
              }
            }}
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setAddSeriesDialogOpen(false)} className="text-gray-600">
            İptal
          </Button>
          <Button 
            onClick={handleAddSeries} 
            className="text-white bg-[#dc143c] hover:bg-[#b01030]"
            variant="contained"
          >
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

// Marka serilerini gösteren komponent
const BrandSeries = React.memo(({ brandId, brandName, series }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [expandedSeries, setExpandedSeries] = useState(null);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Seri sil
  const handleDeleteSeries = useCallback(async () => {
    if (!selectedSeries) return;

    try {
      await api.delete(`/brand/${brandId}/series/${selectedSeries.id}`);
      showSnackbar('Seri başarıyla silindi.', 'success');
      setDeleteDialogOpen(false);
      setSelectedSeries(null);
      navigate(0);
    } catch (error) {
      console.error('Seri silinirken hata:', error);
      showSnackbar('Seri silinirken bir hata oluştu.', 'error');
    }
  }, [selectedSeries, brandId, showSnackbar, navigate]);

  // Accordion açma/kapama
  const handleSeriesAccordionChange = useCallback((seriesId) => (event, isExpanded) => {
    setExpandedSeries(isExpanded ? seriesId : null);
  }, []);

  // Optimize edilmiş seri listesi
  const seriesList = useMemo(() => {
    if (!series || series.length === 0) return null;
    
    return series.map((serie) => (
      <SeriesAccordion
        key={serie.id}
        serie={serie}
        isExpanded={expandedSeries === serie.id}
        onAccordionChange={handleSeriesAccordionChange(serie.id)}
        onDelete={(serie) => {
          setSelectedSeries(serie);
          setDeleteDialogOpen(true);
        }}
        brandId={brandId}
      />
    ));
  }, [series, expandedSeries, handleSeriesAccordionChange, brandId]);

  return (
    <Box>
      <Typography variant="h6" className="mb-3 text-gray-700">
        {brandName} Serileri
      </Typography>
      
      {!series || series.length === 0 ? (
        <Typography className="py-4 text-center text-gray-500">
          Bu markaya ait seri bulunmuyor.
        </Typography>
      ) : (
        <Box className="space-y-3">
          {seriesList}
        </Box>
      )}

      {/* Seri Silme Dialog'u */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle className="font-semibold text-red-600">
          Seri Silme Onayı
        </DialogTitle>
        <DialogContent>
          <Typography>
            <strong>{selectedSeries?.name}</strong> 
            serisini silmek istediğinizden emin misiniz?
          </Typography>
          <Typography className="mt-2 text-sm text-gray-600">
            Bu işlem geri alınamaz ve serinin tüm verileri kalıcı olarak silinecektir.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setDeleteDialogOpen(false)} className="text-gray-600">
            İptal
          </Button>
          <Button 
            onClick={handleDeleteSeries} 
            className="text-white bg-red-500 hover:bg-red-600"
            variant="contained"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

// Optimize edilmiş seri accordion komponenti
const SeriesAccordion = React.memo(({ serie, isExpanded, onAccordionChange, onDelete, brandId }) => {
  const [addModelDialogOpen, setAddModelDialogOpen] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Model ekle
  const handleAddModel = useCallback(async () => {
    if (!newModelName.trim()) {
      showSnackbar('Model adı boş olamaz.', 'error');
      return;
    }

    try {
      await api.post(`/brand/${brandId}/series/${serie.id}/model`, {
        name: newModelName.trim()
      });
      showSnackbar('Model başarıyla eklendi.', 'success');
      setAddModelDialogOpen(false);
      setNewModelName('');
      navigate(0);
    } catch (error) {
      console.error('Model eklenirken hata:', error);
      showSnackbar('Model eklenirken bir hata oluştu.', 'error');
    }
  }, [newModelName, brandId, serie.id, showSnackbar, navigate]);

  return (
    <>
      <Accordion 
        expanded={isExpanded}
        onChange={onAccordionChange}
        className="rounded-lg shadow-sm"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="transition-colors bg-gray-100 hover:bg-gray-200"
        >
          <Box className="flex items-center justify-between w-full pr-4">
            <Box className="flex items-center gap-3">
              <Typography className="font-medium">
                {serie.name}
              </Typography>
              <Chip 
                label={`${serie.models?.length || 0} Model`} 
                size="small" 
                color="secondary" 
                variant="outlined"
              />
            </Box>
            <Box className="flex items-center gap-1">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setAddModelDialogOpen(true);
                }}
                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                size="small"
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(serie);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails className="bg-white">
          <SeriesModels 
            brandId={brandId}
            seriesId={serie.id} 
            seriesName={serie.name} 
            models={serie.models} 
          />
        </AccordionDetails>
      </Accordion>

      {/* Model Ekleme Dialog'u */}
      <Dialog open={addModelDialogOpen} onClose={() => setAddModelDialogOpen(false)}>
        <DialogTitle className="font-semibold text-gray-800">
          {serie.name} Serisine Yeni Model Ekle
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Model Adı"
            type="text"
            fullWidth
            variant="outlined"
            value={newModelName}
            onChange={(e) => setNewModelName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddModel();
              }
            }}
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setAddModelDialogOpen(false)} className="text-gray-600">
            İptal
          </Button>
          <Button 
            onClick={handleAddModel} 
            className="text-white bg-[#dc143c] hover:bg-[#b01030]"
            variant="contained"
          >
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

// Seri modellerini gösteren komponent
const SeriesModels = React.memo(({ brandId, seriesId, seriesName, models }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Model sil
  const handleDeleteModel = useCallback(async () => {
    if (!selectedModel) return;

    try {
      await api.delete(`/brand/${brandId}/series/${seriesId}/model/${selectedModel.id}`);
      showSnackbar('Model başarıyla silindi.', 'success');
      setDeleteDialogOpen(false);
      setSelectedModel(null);
      navigate(0);
    } catch (error) {
      console.error('Model silinirken hata:', error);
      showSnackbar('Model silinirken bir hata oluştu.', 'error');
    }
  }, [selectedModel, brandId, seriesId, showSnackbar, navigate]);

  // Optimize edilmiş model listesi
  const modelsList = useMemo(() => {
    if (!models || models.length === 0) return null;
    
    return models.map((model) => (
      <ListItem key={model.id} className="border-b border-gray-200 last:border-b-0">
        <ListItemText
          primary={model.name}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              setSelectedModel(model);
              setDeleteDialogOpen(true);
            }}
            className="text-red-500 hover:text-red-700"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }, [models]);

  return (
    <Box>
      <Typography variant="subtitle1" className="mb-3 text-gray-600">
        {seriesName} Modelleri
      </Typography>
      
      {!models || models.length === 0 ? (
        <Typography className="py-4 text-center text-gray-500">
          Bu seriye ait model bulunmuyor.
        </Typography>
      ) : (
        <List className="rounded-lg bg-gray-50">
          {modelsList}
        </List>
      )}

      {/* Model Silme Dialog'u */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle className="font-semibold text-red-600">
          Model Silme Onayı
        </DialogTitle>
        <DialogContent>
          <Typography>
            <strong>{selectedModel?.name}</strong> 
            modelini silmek istediğinizden emin misiniz?
          </Typography>
          <Typography className="mt-2 text-sm text-gray-600">
            Bu işlem geri alınamaz ve modelin tüm verileri kalıcı olarak silinecektir.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setDeleteDialogOpen(false)} className="text-gray-600">
            İptal
          </Button>
          <Button 
            onClick={handleDeleteModel} 
            className="text-white bg-red-500 hover:bg-red-600"
            variant="contained"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});
