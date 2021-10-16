import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { saveApi } from '../../services/api';

export function Home() {
  const { data, updateUser, renew } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function updateUserData() {
      setLoading(true)
      try {
        const getStudent = await saveApi.get('/students/', {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        const { student } = getStudent.data;

        updateUser(student, data.token);
        setLoading(false);
      } catch {
        await renew();
        setLoading(false);
      }
    }
    updateUserData()
  }, []);

  return (
    <View>
      <Text>{Home}</Text>
    </View>
  )
}
