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
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../api/axios';
import { useSnackbar } from '../context/SnackbarContext';

export default function DashboardBrandsKokpit() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [expandedBrand, setExpandedBrand] = useState(null);
  const { showSnackbar } = useSnackbar();

  // Markaları getir
  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/brand/');
      console.log('API Response:', response.data); // Debug için
      console.log('Response type:', typeof response.data);
      console.log('Is Array:', Array.isArray(response.data));
      console.log('Response keys:', Object.keys(response.data || {}));
      
      // API response yapısını kontrol et
      let brandsData = [];
      if (Array.isArray(response.data)) {
        brandsData = response.data;
      } else if (response.data?.brands && Array.isArray(response.data.brands)) {
        brandsData = response.data.brands;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        brandsData = response.data.data;
      } else {
        console.log('Unexpected response structure:', response.data);
      }
      
      console.log('Processed brands data:', brandsData);
      setBrands(brandsData);
    } catch (error) {
      console.error('Markalar yüklenirken hata:', error);
      showSnackbar('Markalar yüklenirken bir hata oluştu.', 'error');
      setBrands([]); // Hata durumunda boş array set et
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  // Marka sil
  const handleDeleteBrand = useCallback(async () => {
    if (!selectedBrand) return;

    try {
      await api.delete(`/brand/${selectedBrand.id}`);
      showSnackbar('Marka başarıyla silindi.', 'success');
      setBrands(prev => prev.filter(brand => brand.id !== selectedBrand.id));
      setDeleteDialogOpen(false);
      setSelectedBrand(null);
    } catch (error) {
      console.error('Marka silinirken hata:', error);
      showSnackbar('Marka silinirken bir hata oluştu.', 'error');
    }
  }, [selectedBrand, showSnackbar]);

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

  // Accordion açma/kapama
  const handleAccordionChange = useCallback((brandId) => (event, isExpanded) => {
    setExpandedBrand(isExpanded ? brandId : null);
  }, []);

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
        <DirectionsCarIcon sx={{ fontSize: 32, color: '#dc143c' }} />
        <Typography variant="h5" className="font-semibold">
          Marka ve Seri Yönetimi
        </Typography>
      </Box>

      {brands.length === 0 ? (
        <Box className="text-center py-8 text-gray-500">
          Henüz marka bulunmuyor.
        </Box>
      ) : (
        <Box className="space-y-4">
          {brandsList}
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
    </Box>
  );
}

// Optimize edilmiş marka accordion komponenti
const BrandAccordion = React.memo(({ brand, isExpanded, onAccordionChange, onDelete }) => {
  return (
    <Accordion 
      expanded={isExpanded}
      onChange={onAccordionChange}
      className="shadow-md rounded-lg"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className="bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <Box className="flex items-center justify-between w-full pr-4">
          <Box className="flex items-center gap-3">
            <DirectionsCarIcon sx={{ fontSize: 24, color: '#dc143c' }} />
            <Typography className="font-semibold text-lg">
              {brand.name}
            </Typography>
            <Chip 
              label={`${brand.series?.length || 0} Seri`} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>
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
      </AccordionSummary>
      <AccordionDetails className="bg-white">
        <BrandSeries brandId={brand.id} brandName={brand.name} series={brand.series} />
      </AccordionDetails>
    </Accordion>
  );
});

// Marka serilerini gösteren komponent
const BrandSeries = React.memo(({ brandId, brandName, series }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [expandedSeries, setExpandedSeries] = useState(null);
  const { showSnackbar } = useSnackbar();

  // Seri sil
  const handleDeleteSeries = useCallback(async () => {
    if (!selectedSeries) return;

    try {
      await api.delete(`/series/${selectedSeries.id}`);
      showSnackbar('Seri başarıyla silindi.', 'success');
      setDeleteDialogOpen(false);
      setSelectedSeries(null);
    } catch (error) {
      console.error('Seri silinirken hata:', error);
      showSnackbar('Seri silinirken bir hata oluştu.', 'error');
    }
  }, [selectedSeries, showSnackbar]);

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
      />
    ));
  }, [series, expandedSeries, handleSeriesAccordionChange]);

  return (
    <Box>
      <Typography variant="h6" className="mb-3 text-gray-700">
        {brandName} Serileri
      </Typography>
      
      {!series || series.length === 0 ? (
        <Typography className="text-gray-500 text-center py-4">
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
const SeriesAccordion = React.memo(({ serie, isExpanded, onAccordionChange, onDelete }) => {
  return (
    <Accordion 
      expanded={isExpanded}
      onChange={onAccordionChange}
      className="shadow-sm rounded-lg"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className="bg-gray-100 hover:bg-gray-200 transition-colors"
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
      </AccordionSummary>
      <AccordionDetails className="bg-white">
        <SeriesModels seriesId={serie.id} seriesName={serie.name} models={serie.models} />
      </AccordionDetails>
    </Accordion>
  );
});

// Seri modellerini gösteren komponent
const SeriesModels = React.memo(({ seriesId, seriesName, models }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const { showSnackbar } = useSnackbar();

  // Model sil
  const handleDeleteModel = useCallback(async () => {
    if (!selectedModel) return;

    try {
      await api.delete(`/model/${selectedModel.id}`);
      showSnackbar('Model başarıyla silindi.', 'success');
      setDeleteDialogOpen(false);
      setSelectedModel(null);
    } catch (error) {
      console.error('Model silinirken hata:', error);
      showSnackbar('Model silinirken bir hata oluştu.', 'error');
    }
  }, [selectedModel, showSnackbar]);

  // Optimize edilmiş model listesi
  const modelsList = useMemo(() => {
    if (!models || models.length === 0) return null;
    
    return models.map((model) => (
      <ListItem key={model.id} className="border-b border-gray-200 last:border-b-0">
        <ListItemText
          primary={model.name}
          secondary={`ID: ${model.id}`}
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
        <Typography className="text-gray-500 text-center py-4">
          Bu seriye ait model bulunmuyor.
        </Typography>
      ) : (
        <List className="bg-gray-50 rounded-lg">
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
