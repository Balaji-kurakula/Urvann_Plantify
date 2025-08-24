import { useState, useEffect } from 'react';
import { plantAPI } from '../utils/api';

export const usePlants = (filters = {}) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchPlants = async (newFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await plantAPI.getPlants({ ...filters, ...newFilters });
      setPlants(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const refetch = (newFilters) => fetchPlants(newFilters);

  return { plants, loading, error, pagination, refetch };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await plantAPI.getCategories();
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
