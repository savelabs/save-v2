import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import SkeletonContent from '../../../../components/SkeletonContent';

export function LoadingHeader() {
  return (
    <>
      <SkeletonContent
        containerStyle={{
          width: '100%',
          flexDirection: 'row',
        }}
        isLoading={true}
        layout={[
          {
            marginTop: RFValue(3),
            width: RFValue(78),
            height: RFValue(36),
            borderRadius: RFValue(16),
            marginRight: RFValue(8)
          },
          {
            marginTop: RFValue(3),
            width: RFValue(78),
            height: RFValue(36),
            borderRadius: RFValue(16),
            marginRight: RFValue(14)
          },
          {
            marginTop: RFValue(3),
            width: RFValue(78),
            height: RFValue(36),
            borderRadius: RFValue(16),
            marginRight: RFValue(14)
          },
          {
            marginTop: RFValue(3),
            width: RFValue(10),
            height: RFValue(36),
            borderTopLeftRadius: RFValue(16),
            borderBottomLeftRadius: RFValue(16),
            marginRight: RFValue(14)
          },
        ]}
      />
      <SkeletonContent
        containerStyle={{
          width: '100%',
        }}
        isLoading={true}
        layout={[
          {
            marginTop: RFValue(18),
            marginBottom: RFValue(2),
            width: RFValue(52),
            height: RFValue(12),
            borderRadius: RFValue(8),
          },
          {
            marginTop: RFValue(8),
            marginBottom: RFValue(2),
            width: '100%',
            height: RFValue(48),
            borderRadius: RFValue(8),
          },
        ]}
      />
      <SkeletonContent
        containerStyle={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        isLoading={true}
        layout={[
          {
            marginTop: RFValue(16),
            width: RFValue(48),
            height: RFValue(48),
            borderRadius: RFValue(16),
          },
          {
            marginTop: RFValue(16),
            width: RFValue(48),
            height: RFValue(48),
            borderRadius: RFValue(16),
          },
          {
            marginTop: RFValue(16),
            width: RFValue(48),
            height: RFValue(48),
            borderRadius: RFValue(16),
          },
          {
            marginTop: RFValue(16),
            width: RFValue(48),
            height: RFValue(48),
            borderRadius: RFValue(16),
          },
        ]}
      />
    </>
  )
}
