import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as StoreReview from 'expo-store-review';

import { Button } from '~/components/Button';
import { Invoice } from '~/schema/invoice';
import { useStore } from '~/store';
import { generateInvoicePdf } from '~/utils/pdf';

export default function Success() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const invoice = useStore((data) => data.invoices.find((invoice) => invoice.id === id));

  //TODO: fix no longer working with invoice
  const getSubtotal = useStore((data) => data.getSubtotal());
  const getGst = useStore((data) => data.getGst());
  const getTotal = useStore((data) => data.getTotal());
  const resetNewInvoice = useStore((data) => data.resetNewInvoice);

  const [isLoading, setIsLoading] = useState(true);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const animation = useRef<LottieView>(null);

  useEffect(() => {
    handleGeneratePdf();
  }, []);

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    const uri = await generateInvoicePdf(invoice as Invoice, getSubtotal, getGst, getTotal);
    if (uri) {
      setPdfUri(uri);
      animation.current?.play();
    } else {
      console.log('Failed to generate pdf');
    }

    setIsLoading(false);
  };

  const handleShare = async () => {
    if (!pdfUri) {
      return;
    }

    await shareAsync(pdfUri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#eee',
          zIndex: -100,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../../assets/party.json')}
      />
      {isLoading ? (
        <View className="mb-8 items-center gap-4">
          <MaterialCommunityIcons name="loading" size={80} color="#FF9D23" />
          <Text className="text-center text-2xl font-bold">Generating Invoice...</Text>
          <Text className="text-center text-gray-600">
            Please wait while we prepare your invoice.
          </Text>
        </View>
      ) : (
        <>
          <View className="mb-8 items-center gap-4">
            <MaterialCommunityIcons name="check-circle" size={80} color="#77B254" />
            <Text className="text-center text-2xl font-bold">Invoice Generated</Text>
            <Text className="text-center text-gray-600">
              Your invoice has been successfully generated and its ready to share.
            </Text>
          </View>
        </>
      )}

      <View className="w-full gap-4">
        <Button
          disabled={isLoading}
          className="disabled:bg-gray-500"
          title="Share Invoice"
          variant="primary"
          onPress={handleShare}
        />
        <Button
          title="Go To Home"
          variant="link"
          onPress={() => {
            resetNewInvoice();
            router.replace('/');
          }}
        />
      </View>
    </View>
  );
}
