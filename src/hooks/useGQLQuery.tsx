'use client'

import { useState, useEffect, useRef } from 'react';
import { fetchGraphQL } from '../lib/graphql/client';

export function useGQLQuery(query:string, variables: Record<string, any> = {}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // ✅ FIX: Use ref to store variables and only update when actually changed
  const variablesRef = useRef(variables);
  const queryRef = useRef(query);
  
  // ✅ FIX: Stringify for stable comparison
  const variablesString = JSON.stringify(variables);
  const hasRun = useRef(false);

  useEffect(() => {
    // ✅ Prevent running on mount if already fetched
    if (hasRun.current && 
        queryRef.current === query && 
        JSON.stringify(variablesRef.current) === variablesString) {
      return;
    }
    
    hasRun.current = true;
    variablesRef.current = variables;
    queryRef.current = query;
    
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const result = await fetchGraphQL(query, variables);
        
        if (isMounted) {
          setData(result);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query, variablesString]); // ✅ Use string instead of object

  return { data, loading, error };
}